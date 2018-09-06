import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

export const httpService = {
  post: (url, body) => {
    return axiosInstance.post(url, body)
  },
  setServer: server => {
    axios.defaults.baseURL = server
  }
}
