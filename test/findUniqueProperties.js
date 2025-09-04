'use strict';

QUnit.module("Тестируем функцию findUniqueProperties", function() {
    QUnit.test("Работает правильно для объектов с уникальными свойствами", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2, c: 3 },
            { b: 2, c: 4, d: 5 }
        );

        assert.deepEqual(result, { a: 1, d: 5 }, "Должны быть уникальные свойства из обоих объектов.");
    });

    QUnit.test("Работает правильно для объекты с отсутствующими свойствами", function(assert) {
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

    QUnit.test("Работает правильно для нескольких объектов", function(assert) {
        const result = findUniqueProperties(
            { a: 0, b: 3, i: 5},
            { a: 1, c: 6},
            { i: 5, k: 2}
        )

        assert.deepEqual(result, {b: 3, c: 6, k: 2}, "Должны быть уникальные свойства из всех трёх объектов")
    });

    QUnit.test("Работает правильно для одного объекта", function(assert) {
        const result = findUniqueProperties(
            { a: 0, b: 2, с: 4}
        )

        assert.deepEqual(result, { a: 0, b: 2, с: 4}, "Должны быть все свойства единственного объекта")

    });

    QUnit.test("Работает правильно для пустого объекта", function(assert) {
        const result = findUniqueProperties(
            {}
        )

        assert.deepEqual(result, {}, "Пустой объект должен вернуть пустой объект")
    });
});
