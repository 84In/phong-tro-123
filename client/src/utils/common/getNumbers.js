export const getNumber = (string) => {
  let arr = string.split(" ");
  return arr
    .map((item) =>
      item.search("m") !== -1 ? +item.slice(0, item.length - 1) : +item
    )
    .filter((item) => !item === false);
};
