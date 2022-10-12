const Websocket = require('ws')

const wss = new Websocket.Server({ port: 9001 })

const group = {}
const heartBeatTime = 50000


wss.on('connection', function (ws) {
  ws.isAlive = true
  ws.heartBeatTimeIntervalObj = -1
  ws.heartBeatTimeoutObj = -1

  // Listen to the heartbeat timer, if there is no heartbeat for a long time, it will automatically disconnect
  const setHeartBeatTimeout = () => {
    if (ws.heartBeatTimeoutObj !== -1) {
      clearTimeout(ws.heartBeatTimeoutObj)
      ws.heartBeatTimeoutObj = -1
    }
    ws.heartBeatTimeoutObj = setTimeout(() => {
      ws.close()
      ws.isAlive = false
    }, heartBeatTime)
  }

  setHeartBeatTimeout()

  ws.on('message', function (message) {
    console.log('server receive message: ', message.toString())
    const data = JSON.parse(message.toString())

    setHeartBeatTimeout()
    if (data.event === 'login') {
      ws.enterInfo = data
    }

    if (data.event === 'heartBeat' && data.content === 'ping') {
      ws.isAlive = true

      if (ws.heartBeatTimeoutObj === -1) {
        clearTimeout(ws.heartBeatTimeoutObj)
        ws.heartBeatTimeoutObj = -1
      }
      
      setHeartBeatTimeout()

      ws.send(JSON.stringify({
        event: 'heartBeat',
        content: 'pong',
      }))
      return
    }

    if (typeof ws.roomId === 'undefined' && data.roomId) {
      ws.roomId = data.roomId
      if (typeof group[ws.roomId] === 'undefined') {
        group[ws.roomId] = 1
      } else {
        group[ws.roomId]++
      }
    }

    data.num = group[ws.roomId]
    wss.clients.forEach(client => {
      if (client.readyState === Websocket.OPEN && client.roomId === ws.roomId) {
        client.send(JSON.stringify(data))
      }
    })
  })

  ws.on('close', function (message) {
    group[ws.roomId]--

    wss.clients.forEach(function each (client) {
      if (client !== ws && client.readyState === Websocket.OPEN && client.roomId === ws.roomId) {
        client.send(JSON.stringify({
          ...ws.enterInfo,
          event: 'logout',
          num: group[ws.roomId],
        }))
      }
    })
  })
})
