"use strict";

QUnit.module("Тестируем функцию deepClone", () => {
  QUnit.test("Работает правильно для простого объекта", (assert) => {
    const original = { a: 1, b: 2 };
    const cloned = deepClone(original);

    assert.deepEqual(cloned, original, "Копия должна быть равна оригиналу");
    assert.notStrictEqual(
      cloned,
      original,
      "Копия должна быть независимой от оригинала"
    );
  });

  QUnit.test("Работает правильно для вложенного объекта", (assert) => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = deepClone(original);

    assert.deepEqual(cloned, original, "Копия должна быть равна оригиналу");
    assert.notStrictEqual(
      cloned.b,
      original.b,
      "Вложенный объект должен быть независимым"
    );
  });

  QUnit.test("Работает правильно для массива", (assert) => {
    const original = [1, 2, { a: 3 }];
    const cloned = deepClone(original);

    assert.deepEqual(
      cloned,
      original,
      "Копия массива должна быть равна оригиналу"
    );
    assert.notStrictEqual(
      cloned[2],
      original[2],
      "Вложенный объект в массиве должен быть независимым"
    );
  });

  QUnit.test("Работает правильно для массива не примитивов", (assert) => {
    let map = new Map();
    map.set("1", "test");
    map.set(1234, [1, 2, 3, 4, 5]);
    map.set("abc", { 1: undefined, 2: Infinity });

    let set = new Set();
    set.add("1234");
    set.add({ 1: 2 });
    set.add([123, { a: undefined }]);

    const original = [
      { a: Infinity, b: 1234 },
      { a: new Date(), b: set, c: map },
    ];

    const cloned = deepClone(original);

    assert.deepEqual(
      cloned,
      original,
      "Копия массива должна быть равна оригиналу"
    );
    assert.notStrictEqual(
      cloned[1],
      original[1],
      "Вложенный объект в массиве должен быть независимым"
    );
  });

  QUnit.test("Работает правильно для не объекта", (assert) => {
    const original = "TEST";
    const cloned = deepClone(original);

    assert.deepEqual(
      deepClone("TEST"),
      "TEST",
      "Копия примитива должна быть равна оригиналу"
    );

    assert.deepEqual(
      deepClone(1),
      1,
      "Копия примитива должна быть равна оригиналу"
    );

    assert.deepEqual(
      deepClone(Infinity),
      Infinity,
      "Копия примитива должна быть равна оригиналу"
    );

    assert.deepEqual(
      deepClone(null),
      null,
      "Копия примитива должна быть равна оригиналу"
    );

    assert.deepEqual(
      deepClone(undefined),
      undefined,
      "Копия примитива должна быть равна оригиналу"
    );
  });

  QUnit.test(
    "Работает правильно для вложенного объекта, который нельзя сериализовать в JSON ",
    (assert) => {
      const original = {
        a: 1,
        b: { fn: () => console.log(1), function: undefined },
      };
      const cloned = deepClone(original);

      assert.deepEqual(cloned, original, "Копия должна быть равна оригиналу");
      assert.notStrictEqual(
        cloned,
        original,
        "Копия должна быть независимой от оригинала"
      );
    }
  );

  QUnit.test("Работает правильно для всех примитивов", (assert) => {
    const original = {
      a: 1,
      string: "string",
      c: 439854287524879524n,
      d: true,
      e: undefined,
      f: Symbol("test"),
      g: null,
    };
    const cloned = deepClone(original);

    assert.deepEqual(cloned, original, "Копия должна быть равна оригиналу");
    assert.notStrictEqual(
      cloned,
      original,
      "Копия должна быть независимой от оригинала"
    );
  });
});
