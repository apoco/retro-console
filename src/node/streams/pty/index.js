import { constant } from 'kefir';
import { spawn } from 'child_process';
import pty from 'pty.js';

const terminal = pty.spawn('bash', ['-i'], {
  name: 'ansi',
  cols: 80,
  rows: 25,
  cwd: process.env.HOME,
  env: process.env,
  resume: false
});

export default constant(terminal).toProperty();
