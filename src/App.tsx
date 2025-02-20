import InfiniteScroll from './components/InfiniteScroll';
import Pagination from './components/Pagination';
import './App.css';


const App = () => {
  return (
    <div className="container">
      <h1>Personagens Disney</h1>
      {/*<InfiniteScroll />*/}
      <Pagination/>
    </div>
  );
}

export default App;
