#!/usr/bin/node

import { spawn } from 'node:child_process'

const print = async (child) => {
  for await (const chunk of child.stdout) console.log(`${chunk}`)
}

console.log('\nInstalling PGCLI...\n')

await print(spawn('apt', ['install', 'pgcli']))

console.log('PGCLI installation and configuration has finished.\n')
