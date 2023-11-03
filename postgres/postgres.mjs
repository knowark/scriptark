#!/usr/bin/node

import { spawn } from 'node:child_process'

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

inform('PostgreSQL installation and configuration has finished.')
