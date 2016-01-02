import { fromEvents } from 'kefir';
import { app } from 'electron';

export default fromEvents(app, 'ready').map(() => app);
