import axios from 'axios';
import { useState, useEffect } from 'react';
import useGenres from '../../Hooks/useGenre';
import Genres from '../../components/Genres';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Loader from '../../components/Loader';

const Series = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres,setGenres] = useState([]);
  const genreforUrl = useGenres(selectedGenres);

  const fetchMovies = async() => 
  {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreforUrl}`
      );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  useEffect(() => {
    window.scroll(0,0);
    fetchMovies();
  },[page,genreforUrl])

  if(content.length == 0) return <Loader/>;

  return (
    <div>
        <span className="pageTitle">TV Series</span>
        <Genres type='tv' 
               selectedGenres={selectedGenres} 
               setSelectedGenres={setSelectedGenres}  
               genres={genres} 
               setGenres={setGenres}
               setPage={setPage}
        />
        <div className="trending">
      {
        content && content.map((c) => (
          <SingleContent key={c.id} 
          id={c.id} 
          poster={c.poster_path} 
          title={c.title || c.name} 
          date={c.first_air_date || c.release_data}
          media_type='tv'
          vote_average={c.vote_average}
          />
        ))
      }
      </div>
      {numOfPages>1 &&
      <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
      }
    </div>
  )
}

export default Series