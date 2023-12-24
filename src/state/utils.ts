export const isResultValid = (result: any) => {
  if (result === undefined) return false;
  if (result === null) return false;
  if (typeof result === 'string') return false;
  if (typeof result === 'object' && Object.keys(result).length === 0) { return false; }
  if (Array.isArray(result) && result.length === 0) return false;
  return true;
};
