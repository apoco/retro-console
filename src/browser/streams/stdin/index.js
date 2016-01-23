import { merge } from 'kefir';
import keyPresses from '../window/keyPresses';
import dsrs from './dsrs';

export default merge([keyPresses(window), dsrs]);
