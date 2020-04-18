import store from '@/store'
import axios from 'axios'

/*
 * The interceptor here ensures that we check for the token in local storage every time an ajax request is made
 */
axios.interceptors.request.use(
  (config) => {
    let token = store.getters["auth/accessToken"];
    if (token) {
      console.log(`Adding Header Authorization Bearer ${ token }`)
      config.headers['Authorization'] = `Bearer ${ token }`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const ApiService = {
    getUser() {
        return axios.get('http://www.mocky.io/v2/5e99a1a133000062007b2885');
    }
}