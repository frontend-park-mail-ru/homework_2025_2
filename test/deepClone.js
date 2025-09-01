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

  QUnit.test("Работает правильно для массива объектов", (assert) => {
    const original = [
      { a: 1, b: 2 },
      { a: 2, b: 3, c: 4 },
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

  QUnit.test("Работает правильно для массива вложенных объектов", (assert) => {
    const original = [
      { a: 1, b: { c: 4 } },
      { a: { b: 5 }, c: 6 },
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

    assert.notStrictEqual(
      cloned[0].b,
      original[0].b,
      "Вложенный объект в массиве объектов должен быть независимым"
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
});
