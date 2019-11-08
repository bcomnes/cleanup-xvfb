const exec = require('child_process').exec
const path = require('path')

const scriptPath = path.resolve(__dirname, 'cleanup-xvfb.sh')

exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
  console.log(stdout)
  console.log(stderr)
  if (error !== null) {
    console.log(`exec error: ${error}`)
  }
})
