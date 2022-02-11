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

  register(userInfo) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password
      })
    })
      .then((res) => {
        return this._handleResponse(res);
      })
      .then((res) => {
        return res;
      }).catch(err => console.log('Ошибка', err)
      )
  }

  login(userInfo) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password
      })
    })
      .then((res) => {
        return this._handleResponse(res);
      })
      .then((data) => {
        if (data) {
          localStorage.setItem('token', data.token);
          return data;
        }
      }).catch(err => console.log('Ошибка', err)
      )
  }

  getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._handleResponse)
  }

  updateUserInfo(userInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email
      })
    })
      .then(this._handleResponse)
  }

  getMovies() {
    return fetch(`${this.baseUrl}/movies/`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._handleResponse)
  }

  createMovie(movie) {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      id,
      nameRU,
      nameEN,
    } = movie;

    const finalCountry =
      country === null
        ? "Неизвестно"
        : country.length > 30
          ? country.slice(0, 30)
          : country;

    const finalDirector =
      director === null
        ? "Неизвестно"
        : director.length > 30
          ? director.slice(0, 30)
          : director;

    const imageUrl = `https://api.nomoreparties.co${image.url}`;
    const thumbnail = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;

    return fetch(`${this.baseUrl}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: finalCountry,
        director: finalDirector,
        duration: duration,
        year: year,
        description: description,
        image: imageUrl,
        trailer: trailerLink,
        movieId: id,
        nameRU: nameRU,
        nameEN: nameEN,
        thumbnail: thumbnail,
      }),
    }).then(this._handleResponse);
  }

  deleteMovie(id) {
    return fetch(`${this.baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then(this._handleResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.movies.pupkova.nomoredomains.rocks'
  //baseUrl: 'http://localhost:3000'
});

export default mainApi;
