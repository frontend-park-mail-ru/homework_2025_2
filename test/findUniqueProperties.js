'use strict';

QUnit.module("Тестируем функцию findUniqueProperties", function() {
    QUnit.test("Работает правильно для объектов с уникальными свойствами", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2, c: 3 },
            { b: 2, c: 4, d: 5 }
        );

        assert.deepEqual(result, { a: 1, d: 5 }, "Должны быть уникальные свойства из обоих объектов.");
    });

    QUnit.test("Работает правильно для объектов с отсутствующими свойствами", function(assert) {
        const result = findUniqueProperties(
            { x: 10, y: 20 },
            { y: 20, z: 30 }
        );

        assert.deepEqual(result, { x: 10, z: 30 }, "Должны быть уникальные свойства x и z.");
    });

    QUnit.test("Работает правильно для идентичных объектов", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2 },
            { a: 1, b: 2 }
        );

        assert.deepEqual(result, {}, "Идентичные объекты должны вернуть пустой объект.");
    });

    QUnit.test("Работает правильно для одного пустого объекта", function(assert) {
        const result = findUniqueProperties(
            {},
            { a: 1, b: 2 }
        );

        assert.deepEqual(result, { a: 1, b: 2 }, "При передаче пустого и не пустого объекта должны вернуть не пустой объект.");
    });

    QUnit.test("Работает правильно для объектов со всеми различными ключами", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2, c: 3 },
            { d: 2, e: 4, f: 5 }
        );

        assert.deepEqual(result, { a: 1, b: 2, c: 3, d: 2, e: 4, f: 5 }, "Должны вернуть всю информацию из обоих объектов.");
    });
    
    QUnit.test("Работает правильно для объектов с хранением различных типов данных", function(assert) {
        const result = findUniqueProperties(
            { a: { a: "a", b: "b" }, b: { a: "c" }, c: "d" },
            { a: { a: "a", b: "b" }, b: { a: "c", b: "d" }, d: true }
        );

        assert.deepEqual(result, { c: "d", d: true }, "Должны вернуть уникальные свойства с и d.");
    });

    QUnit.test("Работает правильно для ошибочных типов данных", function(assert) {
        const result = findUniqueProperties(
            "poopaapopa",
            false
        );

        assert.deepEqual(result, {  }, "Должны вернуть пустой объект.");
    });
});
