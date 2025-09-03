'use strict';

QUnit.module("Тестируем функцию deepMerge", function() {
    QUnit.test("Работает правильно с вложенными объектами", function(assert) {
        const source = {
            user: {
                name: "Alice",
                age: 25,
                address: {
                    city: "Wonderland",
                    zip: 12345
                }
            },
            hobbies: ["reading", "gaming"]
        };

        const target = {
            user: {
                age: 30,
                address: {
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const expected = {
            user: {
                name: "Alice",
                age: 30,
                address: {
                    city: "Wonderland",
                    zip: 12345,
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно работать правильно с вложенными объектами");
    });

    QUnit.test("Работает правильно с невложенными объектами", function(assert) {
        const source = {
            name: "Алиса",
            age: 25,
        };

        const target = {
            age: 30,
            isInWonderland: true,
        };

        const expected = {
            name: "Алиса",
            age: 30,
            isInWonderland: true,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно правильно перезаписывать ключи");
    });

    QUnit.test("Работает с пустым исходным объектом", function(assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const target = {};

        const expected = {
            name: "Алиса",
            age: 25,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать исходный объект при отсутствии второго");
    });

    QUnit.test("Работает с двумя пустым исходным объектом", function(assert) {
        const source = {};
        const target = {};

        const expected = {};

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать пустой объект");
    });

    QUnit.test("Заменяет примитив на объект", function(assert) {
        const source = { a: 1 };
        const target = { a: { b: 2 } };

        const expected = { a: { b: 2 } };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Примитив должен быть заменён объектом");
    });

    QUnit.test("Заменяет объект на примитив", function(assert) {
        const source = { a: { b: 2} };
        const target = { a: 1 };

        const expected = { a: 1 };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Объект должен быть заменён примитивом");
    });

    QUnit.test("Работает правильно с глубоко вложенными объектами", function(assert) {
        const source = { a: { b: { c: 1 } } };
        const target = { a: { b: { d: 2 } } };

        const expected = { a: { b: { c: 1, d: 2 } } };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Вложенные объекты должны объединяться");
    });

});
