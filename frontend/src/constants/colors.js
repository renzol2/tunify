export const PURPLES = [
  '#5C0334',
  '#E14A9D',
  '#DB077C',
  '#5C1E40',
  '#A8055F',
  '#7928CA',
  '#FF0080',
  '#56035C',
  '#D74AE1',
  '#CD07DB',
  '#9D05A8',
];

// TODO: use name as hash so we get the same purple for the same name
export function getRandomPurple() {
  const p = PURPLES[Math.floor(Math.random() * PURPLES.length)];
  return p;
}

export const DEFAULT_GRADIENT = 'linear(to-l, #7928CA, #FF0080)';
