import req from 'axios'

export default () => {
  return req.create({
    baseURL: process.env.VUE_APP_API
  })

}