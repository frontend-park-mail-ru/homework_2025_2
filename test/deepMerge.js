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
            hobbies: ["traveling", "gaming"],
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
        const filldObj = {
            name: "Алиса",
            age: 25
        };

        const emptyObj = {};

        const expected = {
            name: "Алиса",
            age: 25,
        };

        let result = deepMerge(filldObj,emptyObj);
        assert.deepEqual(result, expected, "Должно возвращать первый объект при отсутствии второго");
        result = deepMerge(emptyObj, filldObj);
        assert.deepEqual(result, expected, "Должно возвращать второй объект при отсутствии первого");
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

    QUnit.test("Работает правильно с null, undefined, number и string", function(assert) {
        const source = { a: 1, b: 2};
        let result = deepMerge(source,null);
        assert.deepEqual(result, source, "При target=null возвращает копию source");

        result = deepMerge(source,undefined)
        assert.deepEqual(result, source, "При target=undefined возвращает копию source");

        result = deepMerge(source,2025)
        assert.deepEqual(result, source, "При target=number возвращает копию source");

        result = deepMerge(source,"Some string")
        assert.deepEqual(result, source, "При target=string возвращает копию source");

    });

    QUnit.test("Работает правильно когда source не определен", function(assert) {
        let source = null;
        let result = deepMerge(source,null);
        const expected = {};
        assert.deepEqual(result, expected, "При source=null возвращает пустой объект");

        source = undefined;
        result = deepMerge(source,null);
        assert.deepEqual(result, expected, "При source=undefined возвращает пустой объект");

    });
    
    QUnit.test("Работает, если source массив", function(assert) {
        const source = [1, 2, 3];
        const target = "Some string";
        const expected = [1, 2, 3];

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно корректно объединять когда source массив");
    });

    QUnit.test("Работает, если оба входных значения массивы", function(assert) {
        const source = [1, { x: 2 }];
        const target = [{ y: 3 }, 4];
        const expected = [{ y: 3 }, 4];

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно корректно объединять массивы с объектами внутри");
    });

    QUnit.test("Работает, если target массив", function(assert) {
        const source = { a: 1, b: 2 };
        const target = [3, 4];
        const expected = {
            "a": 1,
            "b": 2,
            "0": 3,
            "1": 4
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно объединяет объект и массив");
    });

});
