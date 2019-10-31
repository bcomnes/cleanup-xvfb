const test = require('tape')
const http = require('http')
const url = require('url')
const nanochrome = require('nanochrome')

test('nanochrome() - app', (t) => {
  let chrome
  let shutdownTimeout
  const server = http.createServer((req, res) => {
    res.end('hello')
    t.pass('request received')
    if (!shutdownTimeout) shutdownTimeout = setTimeout(shutdownTest, 100)
  })

  function shutdownTest () {
    chrome.close((err) => {
      t.error(err, 'chrome closed without error')
      server.close((err) => {
        t.error(err, 'server closed without error')
        t.end()
      })
    })
  }

  server.listen(0, (err) => {
    t.error(err, 'server started without error')
    const { port } = server.address()
    const uri = url.format({ protocol: 'http:', hostname: 'localhost', port })
    chrome = nanochrome(uri, {
      app: true,
      chromeFlags: ['--disable-gpu']
    })

    chrome.open((err) => {
      t.error(err, 'chrome opened without error')
    })
  })
})
