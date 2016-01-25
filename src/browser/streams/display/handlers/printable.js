import print from './print';

// Output a printable character
export default function handlePrintable(state, { character }) {
  return print(state, character);
};
