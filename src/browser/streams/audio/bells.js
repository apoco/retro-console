import ttyOutput from '../tty/output';

export default ttyOutput.filter(e => e.type === 'BEL');
