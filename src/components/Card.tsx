import '../App.css';

type CHARACTER = {
  name: string;
  imageUrl: string;
  films: string[];
  videoGames: string[];
  tvShows: string[];
};
const Card = ({ char }: { char: CHARACTER }) => {
    return (<div className="card">
      <img src={char.imageUrl} alt={char.name} />
      <h2>{char.name}</h2>
      <div className="details">
        <h3>Filmes:</h3>
        {char.films.length ? char.films.map((film) => <p key={film}>{film}</p>) : <p>Não disponível</p>}
  
        <h3>Shows de TV:</h3>
        {char.tvShows.length ? char.tvShows.map((show) => <p key={show}>{show}</p>) : <p>Não disponível</p>}
  
        <h3>Videogames:</h3>
        {char.videoGames.length ? char.videoGames.map((game) => <p key={game}>{game}</p>) : <p>Não disponível</p>}
      </div>
    </div>)
}

export default Card;