#!/usr/bin/node

import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const inform = (message) => {
  const color = '[33m' // yellow
  console.log(`\x1b${color}\n${message}\n\x1b[0m`)
}

const command = async (child) => {
  for await (const chunk of child.stdout) console.log(`${chunk}`)
  for await (const chunk of child.stderr) console.log(`${chunk}`)
}

inform('Installing PGCLI...')

await command(spawn('apt-get', ['update']))

await command(spawn('apt-get', ['install', 'pgcli', '-y']))

inform('Installing PSPG...')

await command(spawn('apt-get', ['install', 'pspg', '-y']))

inform('Updating PGCLI configuration...')

const file = '.config/pgcli/config'
const content = readFileSync(file, { encoding: 'utf8' }).replace(
  /# pager = less -SRXF/g, 'pager = pspg -i -s 5').replace(
  /keyring = True/g, 'keyring = False')
writeFileSync(file, content, { encoding: 'utf8' })

inform('PGCLI installation and configuration has finished.')
