

function splitMaintainingCase(str, separator) {
  const result = [];
  let currentIndex = 0;
  const strLength = str.length;
  const separatorLength = separator.length;

  while (currentIndex < strLength) {
    const nextIndex = str.toLowerCase().indexOf(separator.toLowerCase(), currentIndex);
    if (nextIndex === -1) {
      result.push(str.slice(currentIndex));
      break;
    }

    const piece = str.slice(currentIndex, nextIndex);
    result.push(piece);

    currentIndex = nextIndex + separatorLength;
    if (currentIndex === strLength) {
      result.push(''); 
    }
  }

  return result;
}


export function separateStr_1ByStr_2(str_1, str_2) {
  const splittedStr_1 = splitMaintainingCase(str_1, str_2);
  const start = splittedStr_1[0].length;
  const end = start + str_2.length;
  const str_2Original = str_1.substring(start, end); //str_1 in str_2 original
  return [...splittedStr_1, str_2Original];
}

export function sort(sortValue, list, order) {
  switch (sortValue) {
    case order.ASCENDING_ORDER:
      list.sort((a, b) => a.rating - b.rating);
      break;
    case order.DESCENDING_ORDER:
      list.sort((a, b) => b.rating - a.rating);
      break;

    default:
      break;
  }
}

export function isOnlySpaces(str) {
  const strippedStr = str.replace(/\s/g, "");
  return strippedStr.length === 0;
}

export function arrayInRange(start, end) {
  return [...Array(end - start).keys()].map((el) => el + start);
}

export function getPagesCut({ numbOfPages, numbOfPagesCut, currentPage }) {
  const ceiling = Math.ceil(numbOfPagesCut / 2);
  const floor = Math.floor(numbOfPagesCut / 2);

  if (numbOfPages < numbOfPagesCut) {
    return { start: 1, end: numbOfPages + 1 };
  }

  if (currentPage >= 1 && currentPage <= ceiling) {
    return { start: 1, end: numbOfPagesCut + 1 };
  }

  if (currentPage + floor >= numbOfPages) {
    return { start: numbOfPages - numbOfPagesCut + 1, end: numbOfPages + 1 };
  }

  return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
}

export function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
