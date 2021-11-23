class MoviesApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getBeatfilmMovies() {
    return fetch(this.baseUrl, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(this._handleResponse);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;