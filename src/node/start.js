import { combine } from 'kefir';

import windowLoaded from './streams/window/loaded';
import input from './streams/io/input';
import exits from './streams/electron/exits';

export default function start() {

  combine([windowLoaded, input]).onValue(([window, input]) => {
    window.webContents.send('input', input);
  });

  if (process.platform !== 'darwin') {
    exits.onValue(app => app.quit());
  }
}
