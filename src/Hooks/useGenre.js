const useGenres = (selectedGenre) => 
{
    if(selectedGenre.length < 1) return "";

    const genreIds = selectedGenre.map((g) => g.id);

    return genreIds.reduce((acc,cur) => acc + ',' + cur);
}

export default useGenres;