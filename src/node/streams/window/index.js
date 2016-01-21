import { fromEvents } from 'kefir';
import { BrowserWindow } from 'electron';
import electronApp from '../electron';

export default electronApp
  .flatMap(() => {
    const window = new BrowserWindow({width: 800, height: 600});
    window.loadURL(`file://${__dirname}/../../../../html/index.html`);
    return fromEvents(window.webContents, 'did-finish-load').map(() => window);
  })
  .toProperty();
