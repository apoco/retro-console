import allOutput from './';

export default allOutput.filter(({ type, params = [0] }) => type === 'DA' && params[0] === 0);
