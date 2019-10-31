const exec = require('child_process').exec

exec('sh cleanup-xvfb.sh', (error, stdout, stderr) => {
  console.log(stdout)
  console.log(stderr)
  if (error !== null) {
    console.log(`exec error: ${error}`)
  }
})
