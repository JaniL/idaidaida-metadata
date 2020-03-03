const axios = require('axios')
const R = require('ramda')

const idaidaida = axios.create({
  baseURL: 'https://admin.idaidaida.net'
})

const convertStringToDate = string => new Date(string + ' GMT+0200')

const handleEpisodeTime = R.evolve({
  episode_start: convertStringToDate,
  episode_end: convertStringToDate
})

const handleShow = R.evolve({
  episode_time: handleEpisodeTime
})

const handleStation = R.evolve({
  live_show: handleShow,
  next_show: handleShow,
  todays_schedule: R.map(handleShow)
})

const handleResponse = R.map(handleStation)

const getLiveStatus = () =>
  idaidaida.get('/wp-json/ida/v3/live')
    .then(res => res.data)
    .then(handleResponse)

module.exports = {
  getLiveStatus
}