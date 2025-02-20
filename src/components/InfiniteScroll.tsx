import { useEffect, useState, useRef, useCallback } from 'react';
import Card from './Card';
import '../App.css';

type CHARACTER = {
  name: string;
  imageUrl: string;
  films: string[];
  videoGames: string[];
  tvShows: string[];
};

const InfiniteScroll = () => {
  const [characters, setCharacters] = useState<CHARACTER[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchCharacters = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    try {
      const response = await fetch(`https://api.disneyapi.dev/character?page=${page}&pageSize=10`);
      const data = await response.json();
      if (data.data.length > 0) {
        setCharacters((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao buscar personagens');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

useEffect(() => {
  fetchCharacters();
}, []);

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchCharacters();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading]);

  return (
    <div>
      {!loading && error && <p className="error">{error}</p>}
      
      <div className="characters">
        {characters.map((char) => (
          <Card key={char.name} char={char} />
        ))}
      </div>

      <p ref={loaderRef} className="loader">
        {loading ? 'Carregando mais personagens...' : 'Ver mais'}
      </p>

    </div>
  );
};

export default InfiniteScroll;
