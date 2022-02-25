# clean-object

This is a no-dependency helper function that recurses an object and drops its
undefined values.

```javascript
const clean = require("clean-object");

const output = clean({
  foo: 1,
  bar: 2,
  quuz: undefined,
});

// dropped quuz
console.log(output);
```
