class MainApi {
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
}

const mainApi = new MainApi({
  baseUrl: 'https://api.movies.pupkova.nomoredomains.rocks',
});

export default mainApi;