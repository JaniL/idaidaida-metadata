const program = require('commander')
const R = require('ramda')
const idaidaida = require('./api')

program
  .name("idaidaida-metadata")
  .description("used for retrieving station metadata for streamripper")
  .requiredOption('-c, --city <city>', 'retrieve metadata from defined city station')
  .parse(process.argv)

const handleCity = city => {
  const { live_show } = city
  if (!live_show) {
    return ""
  }
  return R.prop('title', live_show)
}

idaidaida.getLiveStatus()
  .then(R.prop(program.city))
  .then(handleCity)
  .then(R.tap(console.log))