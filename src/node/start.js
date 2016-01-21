import { combine } from 'kefir';
import electron from './streams/electron';
import window from './streams/window';
import pty from './streams/pty';
import stdout from './streams/pty/stdout';
import stdin from './streams/window/stdin';
import exits from './streams/app/exits';

export default function start() {

  combine([electron, window, pty]).onValue(([app, window, pty]) => {

    exits.take(1).onValue(() => {
      pty.kill('SIGTERM');
      app.quit(0);
    });

    stdout
      .takeUntilBy(exits)
      .onValue(data => {
        window.webContents.send('stdout', data)
      });

    stdin.onValue(ch => {
      console.log('Got', ch, ch.charCodeAt(0));
      pty.write(ch);
    });
  });
}
