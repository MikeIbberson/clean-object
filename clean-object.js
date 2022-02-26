const isArray = (xs) => Array.isArray(xs);
const isDate = (xs) => xs instanceof Date;
const isObject = (xs) => typeof xs === "object";
const isNull = (xs) => xs === null;
const isUndefined = (xs) => xs === undefined;

const isEmptyObject = (xs) => isObject(xs) && !Object.keys(xs).length;

const isObjectId = (xs) => {
  try {
    return isObject(xs) && xs.constructor.name === "ObjectId";
  } catch (e) {
    return false;
  }
};

const clean = (xs) => {
  if (isArray(xs)) return xs.map(clean);
  if (isDate(xs) || isNull(xs) || isObjectId(xs) || !isObject(xs)) return xs;

  return Object.entries(xs).reduce((acc, [key, v]) => {
    if (!isUndefined(v)) {
      const out = clean(v);

      // will ensure no accidental "key: {}" situations
      if (
        !isNull(out) &&
        !isDate(out) &&
        !isArray(out) &&
        !isObjectId(out) &&
        isEmptyObject(out)
      )
        return acc;

      Object.assign(acc, {
        // this will still hold an empty object in the array place
        // this is important for maintaining index size
        [key]: isArray(out) ? clean(out) : out,
      });
    }

    return acc;
  }, {});
};

module.exports = clean;
