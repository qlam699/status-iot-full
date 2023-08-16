const { faker } = require('@faker-js/faker')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const MAX_ROW = 10

const generateDevices = (num = 10) => {
  return [...Array(num).keys()].map((index) => genDevice(index))
}

const genTemp = (num) => {
  return [...Array(num).keys()].map(item => ({
    time: faker.number.int({ min: 0, max: 70 }),
    temp: faker.number.int({ min: -20, max: 100 })
  }))
}

const genDevice = (id) => {
  return {
    id: id ?? faker.number.int({ min: 0, max: MAX_ROW }),
    name: faker.commerce.productName(),
    location: faker.location.city(),
    currentTemperature: faker.number.int({ min: 1, max: 100 }),
    status: status[faker.number.int({ min: 0, max: 3 })],
    temperatureDataPoint: genTemp(faker.number.int({ min: 1, max: 10 }))
  }
}

function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache'
  }
  response.writeHead(200, headers)

  setInterval(() => {
    const data = `data: ${JSON.stringify(genDevice())}\n\n`
    response.write(data)
  }, 1000)

  const clientId = Date.now()

  const newClient = {
    id: clientId,
    response
  }

  clients.push(newClient)

  request.on('close', () => {
    console.log(`${clientId} Connection closed`)
    clients = clients.filter((client) => client.id !== clientId)
  })
}

app.get('/gendevices', (req, res) => {
  res.jsonp(generateDevices(MAX_ROW))
})
app.get('/events', eventsHandler)

const PORT = 4000

let clients = []
let status = ['disconnected', 'connected', 'healthy', 'error']


app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})
