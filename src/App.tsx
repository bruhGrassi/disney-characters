import InfiniteScroll from "./components/InfiniteScroll";
import Pagination from "./components/Pagination";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [pagination, setPagination] = useState("pagination");

  return (
    <div className="container">
      <header>
        <h1>Personagens Disney </h1>
        <img src="/mickey.png" alt="" />
      </header>

      <div className="action">
        <button onClick={() => setPagination("pagination")}>Paginação</button>
        <button onClick={() => setPagination("scroll")}>Scroll Infinito</button>
      </div>
      {pagination !== "pagination" && <InfiniteScroll />}
      {pagination === "pagination" && <Pagination />}
    </div>
  );
};

export default App;
