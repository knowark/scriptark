#!/usr/bin/node

import { spawn, execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const inform = (message) => {
  const color = '[33m' // yellow
  console.log(`\x1b${color}\n${message}\n\x1b[0m`)
}

const command = async (child) => {
  for await (const chunk of child.stdout) console.log(`${chunk}`)
  for await (const chunk of child.stderr) console.log(`${chunk}`)
}

inform('Installing PostgreSQL...')

await command(spawn('apt-get', ['update']))

await command(spawn('apt-get', ['install', 'postgresql', '-y']))

inform('Getting PostgreSQL configuration files...')

const configFile = execSync(
  "sudo -Hiu postgres psql -c 'SHOW config_file'"
).toString().split('\n')[2].trim()

const hbaFile = execSync(
  "sudo -Hiu postgres psql -c 'SHOW hba_file'"
).toString().split('\n')[2].trim()

console.log({ configFile, hbaFile })

inform('Updating PostgreSQL configuration...')

let content = readFileSync(configFile, { encoding: 'utf8' }).replace(
  /#listen_addresses = 'localhost'/g, "listen_addresses = '*'")
writeFileSync(configFile, content, { encoding: 'utf8' })

content = readFileSync(hbaFile, { encoding: 'utf8' }).replace(
  /127.0.0.1\/32/g, '0.0.0.0/0')
writeFileSync(hbaFile, content, { encoding: 'utf8' })

inform('Change postgres user password...')

console.log(execSync(
  'sudo -Hiu postgres psql -c "ALTER USER postgres PASSWORD \'postgres\';"'
).toString())

inform('Restart PostgreSQL server...')

await command(spawn('systemctl', ['restart', 'postgresql']))

inform('PostgreSQL installation and configuration has finished.')
