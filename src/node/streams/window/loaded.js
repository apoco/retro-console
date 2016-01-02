import { fromEvents } from 'kefir';
import { BrowserWindow } from 'electron';
import appStarts from '../electron/starts';

export default appStarts.flatMap(app => {
  const mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/../../../browser/html/index.html`);
  return fromEvents(mainWindow.webContents, 'did-finish-load').map(() => mainWindow);
});
