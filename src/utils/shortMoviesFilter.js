function filterShortMovies(data) {
  const filteredShortMovies = data.filter((el) => {
    return el.duration <= 40;
  });

  return filteredShortMovies;
}

export default filterShortMovies