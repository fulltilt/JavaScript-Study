const objectMap = require("./objectMap");

const double = (x) => x * 2;

describe("objectMap", () => {
  test("empty", () => {
    expect(objectMap({}, double)).toEqual({});
  });

  test("single key", () => {
    expect(objectMap({ foo: 2 }, double)).toEqual({ foo: 4 });
  });

  test("multiple keys", () => {
    expect(objectMap({ foo: 2, bar: 3 }, double)).toEqual({ foo: 4, bar: 6 });
  });

  test("can access `this`", () => {
    expect(
      objectMap({ bar: 3, foo: 2 }, function (x) {
        return x * this.foo;
      })
    ).toEqual({
      foo: 4,
      bar: 6,
    });
  });

  test("does not mutate the input", () => {
    const obj = { bar: 3, foo: 2 };
    expect(objectMap(obj, double)).toEqual({
      foo: 4,
      bar: 6,
    });
    expect(obj).toEqual({
      foo: 2,
      bar: 3,
    });
  });
});
