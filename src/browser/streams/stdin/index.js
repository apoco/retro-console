import { merge } from 'kefir';
import keyPresses from '../window/keyPresses';
import cprs from './cprs';
import dsrs from './dsrs';
import das from './das';

export default merge([keyPresses(window), cprs, das, dsrs]);
