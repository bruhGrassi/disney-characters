import { useEffect, useState, useRef } from 'react';
import './App.css';

type CHARACTER = {
  name: string;
  imageUrl: string;
  films: string[];
  videoGames: string[];
  tvShows: string[];
};

function App() {
  const [character, setCharacter] = useState<CHARACTER[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const checkData = (data: CHARACTER | CHARACTER[]) => {
    const normalizedData = Array.isArray(data) ? data : [data];
    setCharacter(normalizedData);
  };

  const getFullList = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.disneyapi.dev/character?page=${page}&pageSize=10`
      );
      const data = await response.json();

      if (data.data.length > 0) {
        setCharacter((prev) => [...prev, ...data.data]);
      } else {
        setHasMore(false);
      }
    } catch {
      (error: string) => {
        setCharacter([]);
        setError(error);
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFullList();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.observe(loaderRef.current);
      }
    };
  }, [hasMore, loading]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setCharacter([]);
    setError('');

    try {
      const response = await fetch(
        `https://api.disneyapi.dev/character?name=${query}`
      );
      const data = await response.json();

      if (data.info.count !== 0) {
        checkData(data.data);
      } else {
        setCharacter([]);
        setError('Personagem não encontrado');
      }
    } catch {
      setCharacter([]);
      setError('Erro ao buscar personagem');
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  return (
    <div className="container">
      <h1>Personagens Disney</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite o nome do personagem..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>

      {loading && <p className="loading">Buscando...</p>}
      {!loading && error && <p className="error">{error}</p>}

      <div className="characters">
        {!loading &&
          character.map((char) => (
            <div key={char.name} className="card">
              <img src={char.imageUrl} alt={char.name} />
              <h2>{char.name}</h2>
              <div className="details">
                <h3>Filmes:</h3>
                {char.films.length ? (
                  char.films.map((film) => <p key={film}>{film}</p>)
                ) : (
                  <p>Não disponível</p>
                )}

                <h3>Shows de TV:</h3>
                {char.tvShows.length ? (
                  char.tvShows.map((show) => <p key={show}>{show}</p>)
                ) : (
                  <p>Não disponível</p>
                )}

                <h3>Videogames:</h3>
                {char.videoGames.length ? (
                  char.videoGames.map((game) => <p key={game}>{game}</p>)
                ) : (
                  <p>Não disponível</p>
                )}
              </div>
            </div>
          ))}

        {hasMore && (
          <div ref={loaderRef} className="loader">
            {loading ? 'Carregando mais personagens...' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
