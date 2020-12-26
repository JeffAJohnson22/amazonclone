import axios from 'axios'

let testUrl = 'http://localhost:5001/clone-e10bb/us-central1/api'
let realUrl = 'https://us-central1-clone-e10bb.cloudfunctions.net/api '

export const instance = axios.create({
  baseURL: realUrl 
})

