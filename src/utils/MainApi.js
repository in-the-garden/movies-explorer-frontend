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
}

const mainApi = new MainApi({
  baseUrl: 'https://api.movies.pupkova.nomoredomains.rocks',
});

export default mainApi;