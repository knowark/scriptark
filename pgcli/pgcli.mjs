#!/usr/bin/node

import util from 'node:util'
import { exec as shell } from 'node:child_process'
const exec = util.promisify(shell)

let output = null

console.log('Installing PGCLI...\n')

output = await exec('apt install pgcli')

console.log(output.stdout)

console.log('PGCLI installation and configuration has finished.\n')
