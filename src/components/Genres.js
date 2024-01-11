import { Chip, ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

const Genres = ({
    type,
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage,
}) => {

    const handleAdd = (genre) => 
    {
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g) => g.id!==genre.id));
        setPage(1);
    }
    const handleRemove = (selectedGenre) => 
    {
        setGenres([...genres,selectedGenre]);
        setSelectedGenres(selectedGenres.filter((g) => g.id !== selectedGenre.id))
        setPage(1);
    }

    const fetchGenres = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setGenres(data.genres);
    };

    useEffect(() => {
        fetchGenres();
        return () => { 
            setGenres([]);
        };
    },[]);

  return (
    <div style={{padding: '6px 0'}}>
    {selectedGenres?.map((selectedGenre) => 
    <Chip color='primary' label={selectedGenre.name} key={selectedGenre.id} style={{margin: 5}} size='small' clickable onDelete={() => handleRemove(selectedGenre) }/>)}
    {genres?.map((genre) => 
    <Chip theme={darkTheme} label={genre.name} key={genre.id} style={{margin: 5}} size='small' clickable onClick={() => handleAdd(genre)}/>)}    

    </div>
  )
}

export default Genres