#!/usr/bin/node

import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const command = async (child) => {
  for await (const chunk of child.stdout) console.log(`${chunk}`)
  for await (const chunk of child.stderr) console.log(`${chunk}`)
}

console.log('\nInstalling PGCLI...\n')

await command(spawn('apt-get', ['update']))

await command(spawn('apt-get', ['install', 'pgcli', '-y']))

console.log('\nInstalling PSPG...\n')

await command(spawn('apt-get', ['install', 'pspg', '-y']))

console.log('\nUpdating PGCLI configuration...\n')

const file = '.config/pgcli/config'
const content = readFileSync(file, { encoding: 'utf8' }).replace(
  /# pager = less -SRXF/g, 'pager = pspg -i -s 5')
writeFileSync(file, content, { encoding: 'utf8' })

console.log('PGCLI installation and configuration has finished.\n')
