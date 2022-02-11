function filterMovies(data, keyword) {
  const filteredMovies = data?.filter((el) => {
    const movieNameRU = el.nameRU && el.nameRU.toLowerCase();
    const movieNameEN = el.nameEN && el.nameEN.toLowerCase();

    return (
      (movieNameRU && movieNameRU.includes(keyword)) ||
      (movieNameEN && movieNameEN.includes(keyword))
    )
  });

  return filteredMovies;
}

export default filterMovies;
