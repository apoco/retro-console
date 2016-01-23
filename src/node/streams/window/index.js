import { fromEvents } from 'kefir';
import { BrowserWindow } from 'electron';
import electronApp from '../electron';

export default electronApp
  .flatMap(() => {
    const window = new BrowserWindow({width: 960, height: 500});
    window.loadURL(`file://${__dirname}/../../../../html/index.html`);
    return fromEvents(window.webContents, 'did-finish-load').map(() => window);
  })
  .toProperty();
