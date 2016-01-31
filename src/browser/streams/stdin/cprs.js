import { combine } from 'kefir';

import cprRequests from '../stdout/cprRequests';
import charGrid from '../display/state';

export default combine([cprRequests], [charGrid])
  .map((req, { pos: { row, col } }) => `\u001b[${row};${col}R`);
