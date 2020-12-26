import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://localhost:5001/clone-e10bb/us-central1/api'
})

