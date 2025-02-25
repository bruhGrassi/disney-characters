import React, { useEffect, useState } from "react";
import Card from "./Card";
import Skeleton from "./Skeleton";
import "../App.css";

type CHARACTER = {
  name: string;
  imageUrl: string;
  films: string[];
  videoGames: string[];
  tvShows: string[];
};

const Pagination = () => {
  const [characters, setCharacters] = useState<CHARACTER[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 10;

  const fetchCharacters = async (page: number) => {
    setLoading(true);

    setCurrentPage(page);

    try {
      const response = await fetch(
        `https://api.disneyapi.dev/character?page=${page}&pageSize=${PAGE_SIZE}`
      );
      const data = await response.json();

      setCharacters(data.data);
      setTotalPages(data.info.totalPages);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao buscar personagens"
      );
    } finally {
      setLoading(false);
    }
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
    const prevPage = currentPage - 1;
    fetchCharacters(prevPage);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    const next = currentPage + 1;
    fetchCharacters(next);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchCharacters(currentPage);
  };

  useEffect(() => {
    fetchCharacters(1);
  }, []);

  return (
    <>
      {!loading && error && <p className="error">{error}</p>}

      <div className="characters">
        {loading ? (
          <Skeleton />
        ) : (
          characters.map((char) => <Card key={char.name} char={char} />)
        )}
      </div>

      {!loading && totalPages > 0 && (
        <form className="pagination" onSubmit={handleSubmit}>
          <button type="button" disabled={currentPage === 1} onClick={prevPage}>
            ⬅️ Anterior
          </button>
          <input
            type="number"
            value={currentPage}
            onChange={(event) => setCurrentPage(Number(event.target.value))}
          />
          <span>de {totalPages}</span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            Próxima ➡️
          </button>
        </form>
      )}
    </>
  );
};

export default Pagination;
