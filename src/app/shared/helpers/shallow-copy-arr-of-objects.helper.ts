
export const shallowCopyArrOfObjects = (items: Object[]) => items.map(item => ({ ...item }));
