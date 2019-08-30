
export const stopEvent = (event: any): void => {
  if (event) { event.stopPropagation(); event.preventDefault(); }
};
