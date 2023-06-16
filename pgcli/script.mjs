#!/usr/bin/node

import util from 'node:util'
import { exec as shell } from 'node:child_process'

const exec = util.promisify(shell)

const { stdout, stderr } = await exec(ls)

console.log('stdout:::', stdout)
console.log('stderr:::', stderr)
