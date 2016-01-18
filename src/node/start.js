import { combine } from 'kefir';

import electron from './streams/electron';
import window from './streams/window';
import shell from './streams/pty';
import stdout from './streams/pty/stdout';
import exits from './streams/app/exits';

export default function start() {

  combine([electron, window, shell]).onValue(([app, window, shell]) => {

    exits.take(1).onValue(() => {
      shell.kill('SIGTERM');
      app.quit(0);
    });

    stdout
      .takeUntilBy(exits)
      .onValue(data => {
        window.webContents.send('stdout', data)
      });
    /*
    stderr
      .takeUntilBy(exits)
      .onValue(data => {
        console.log('Sending error content', data);
        window.webContents.send('stderr', data)
      });
    */
  });
}
