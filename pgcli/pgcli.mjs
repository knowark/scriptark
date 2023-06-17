#!/usr/bin/node

import { spawn } from 'node:child_process'

const command = async (child) => {
  for await (const chunk of child.stdout) console.log(`${chunk}`)
  for await (const chunk of child.stderr) console.log(`${chunk}`)
}

console.log('\nInstalling PGCLI...\n')

await command(spawn('apt-get', ['update']))

await command(spawn('apt-get', ['install', 'pgcli', '-y']))

console.log('PGCLI installation and configuration has finished.\n')
