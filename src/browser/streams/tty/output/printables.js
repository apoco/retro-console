import output from './';

export default output.filter(e => e.type === 'printable').map(e => e.character);
