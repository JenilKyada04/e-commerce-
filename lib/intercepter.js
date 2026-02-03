import axios from 'axios'

const apiurl = process.env.NEXT_PUBLIC_BASE_URL

const interceptor = axios.create({
  baseURL: apiurl
})

interceptor.interceptors.request.use(config => {
  // manioulate congig

  config.headers["Authorization"] = "jenil kyada"
  // console.log(config)

  return config
}, error => {
  console.log(error)
  return promises.reject(error)
})

interceptor.interceptors.response.use( response => {

  // console.log("response intercepter ")
  // console.log(response)

  return response
}, error => {

  const stat = error.response ? error.response.status : null;
  console.log("Error Status:", stat);

  console.log(error)
  return promises.reject(error)
})

export default interceptor
