export const internalsSymbol = Symbol.for('internals');

export const clamp = (val: number, min = 0, max = 1): number => Math.min(Math.max(val, min), max);