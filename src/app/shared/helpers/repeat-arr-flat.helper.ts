
export const repeatArrFlat = (arr: any[], times: number): any[] =>
  Array(times).fill(arr).reduce((acc, val) => acc.concat(val), []);
