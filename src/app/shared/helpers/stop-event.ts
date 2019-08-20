
export const stopEvent = (event: any): void => {
  event.stopPropagation(); event.preventDefault();
};
