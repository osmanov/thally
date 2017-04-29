const shell = require('shelljs')
const exec = require('child_process').exec
const readline = require('readline')

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdout.write('\n')
let interval = animateProgress('Cleaning old repository ')
process.stdout.write('Cleaning old repository ')

clearRepo(() => {
  clearInterval(interval)
  process.stdout.write('\nInstalling dependencies')
  setTimeout(() => {
    readline.cursorTo(process.stdout, 0)
    interval = animateProgress('Installing dependencies ')
  }, 500)

  installDeps()
})

function updateReadedLine() {
  readline.clearLine(process.stdout)
  readline.cursorTo(process.stdout, 0)
}

function animateProgress(message, amountOfArrows = 10, isStatic) {
  if (isStatic) {
    updateReadedLine()
    return process.stdout.write((message))
  }

  let i = 0
  return setInterval(() => {
    updateReadedLine()
    i = (i + 1) % (amountOfArrows + 1)
    const arrow = `<${new Array(i + 1).join('=')}>`
    process.stdout.write(message + arrow)
  }, 500)
}

function addCheckMark(callback) {
  process.stdout.write(('✓'))
  if (callback) callback()
}


function clearRepo(callback) {
  shell.rm('-rf', '.git/')
  addCheckMark(callback)
}


function installDeps() {
  exec('npm install', () => {
    animateProgress('Installing dependencies ', null, true)
    addCheckMark(installDepsCallback)
  })
}


function installDepsCallback(error) {
  clearInterval(interval)
  if (error) {
    process.stdout.write(error)
  }
  process.stdout.write('\nTHALL is DONE!\n')
  process.exit(0)
}
