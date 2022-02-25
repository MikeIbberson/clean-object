const clean = require("./");

const d = new Date();

test.each([
  [{ empty: {} }, {}],
  [{ empty: { key: undefined } }, {}],
  [{ nonempty: { key: undefined, value: 1 } }, { nonempty: { value: 1 } }],
  [{ date: d, array: [], string: "foo", number: 1, null: null }, true],
  [
    {
      date: d,
      array: [
        {
          empty: undefined,
        },
        {
          empty: null,
        },
      ],
      string: "foo",
      number: 1,
    },
    {
      date: d,
      array: [
        {},
        {
          empty: null,
        },
      ],
      string: "foo",
      number: 1,
    },
  ],
  [{ empty: { key: [] } }, true],
  [{ empty: { key: d } }, true],
  [{ empty: { key: null } }, true],
])(".clean(%o)", (a, expected) => {
  // when expected is undefined, expect full equality
  expect(clean(a)).toMatchObject(
    typeof expected === "boolean" && expected ? a : expected
  );
});
