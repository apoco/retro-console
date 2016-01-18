import { fromEvents } from 'kefir';
import electronApp from './';

export default electronApp.flatMap(app => fromEvents(app, 'window-all-closed').map(() => app));
