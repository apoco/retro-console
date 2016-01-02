import { fromEvents } from 'kefir';
import starts from './starts';

export default starts.flatMap(app => fromEvents(app, 'window-all-closed').map(() => app));
