import allOutput from './';

export default allOutput.filter(({ type, params = [] }) => type === 'DSR' && params[0] === 5);
