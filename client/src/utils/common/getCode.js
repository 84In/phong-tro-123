import { getNumber } from "./getNumbers";

export const parseCode = (totals) => {
  let arr = [];
  return totals.map((item) => {
    let arrMaxMin = getNumber(item.value);

    if (arrMaxMin.length === 1) {
      arr.push(arrMaxMin[0]);
    }
    let sortedArr = arr.sort();

    return {
      ...item,
      min:
        sortedArr.indexOf(arrMaxMin[0]) === 0 && arrMaxMin.length === 1
          ? 0
          : arrMaxMin[0],
      max:
        sortedArr.indexOf(arrMaxMin[0]) === 0 && arrMaxMin.length === 1
          ? arrMaxMin[0]
          : sortedArr.indexOf(arrMaxMin[0]) === 1 && arrMaxMin.length === 1
          ? 999999999
          : arrMaxMin[1],
    };
  });
};
export const getCodes = (arrMinMax, key) => {
  const arrMinMaxKey = parseCode(key);
  return arrMinMaxKey.filter(
    (item) =>
      (+arrMinMax[0] === arrMinMax[1] &&
        +item.min < +arrMinMax[0] &&
        +item.max >= +arrMinMax[0]) ||
      (+arrMinMax[0] !== +arrMinMax[1] &&
        +item.min >= +arrMinMax[0] &&
        +item.min <= +arrMinMax[1]) ||
      (+item.max >= arrMinMax[0] && +item.max <= +arrMinMax[1])
  );
};
