import characters from './';

export default characters.filter(ch => (ch >= '\u0020' && ch < '\u007f') || ch >= '\u00a0');
