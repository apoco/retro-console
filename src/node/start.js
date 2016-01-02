import windowLoaded from './streams/window/loaded';
import input from './streams/io/input';
import exits from './streams/electron/exits';

export default function start() {

  let mainWindow = null;

  windowLoaded.onValue(window => {
    mainWindow = window;
    console.log('Content loaded');
  });

  input.onValue(ch => console.log('Got character', ch));

  if (process.platform !== 'darwin') {
    exits.onValue(app => app.quit());
  }
}
