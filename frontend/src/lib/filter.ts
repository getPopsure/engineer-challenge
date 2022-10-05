const filter = (arr: Array<any>, callback: Function) => {
  const result = [];
  for (const elem of arr) {
    if (callback(elem)) {
      result.push(elem);
    }
  }
  return result;
}


export default filter

