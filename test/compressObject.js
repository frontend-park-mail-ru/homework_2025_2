'use strict';

QUnit.module("Тестируем функцию compressObject", function() {
    QUnit.test("Сжатие объекта с null, undefined и пустыми строками", function(assert) {
        const result = compressObject({
            name: "Андрей",
            age: null,
            city: "",
            country: "Россия",
            occupation: undefined
        });

        assert.deepEqual(result, { name: "Андрей", country: "Россия" }, "Должны остаться только ключи с ненулевыми значениями.");
    });

    QUnit.test("Работает с объектом без ненулевых значений", function(assert) {
        const result = compressObject({
            a: null,
            b: undefined,
            c: "",
        });

        assert.deepEqual(result, {}, "Объект без ненулевых значений должен вернуть пустой объект.");
    });

    QUnit.test("Работает с пустым объектом", function(assert) {
        const result = compressObject({});

        assert.deepEqual(result, {}, "Пустой объект должен вернуть пустой объект.");
    });

    QUnit.test("Работает с типами данных Boolean и BigInt", function(assert) {
        const result = compressObject({
            bigInt: 1234567890123456789012345678901234567890n,
            booleanTrue: true,
            booleanFalse: false,
        });

        assert.deepEqual(result, {
            bigInt: 1234567890123456789012345678901234567890n, 
            booleanTrue: true,
            booleanFalse: false
        }, "Типы данных Boolean и BigInt возвращаются");
    });

    QUnit.test("Работает с NaN, 0, Infinity и -Infinity", function(assert) {
        const result = compressObject({
            nan: NaN,
            zero: 0,
            infinity: Infinity,
            minusInfinity: -Infinity,
        });

        assert.deepEqual(result, {
            nan: NaN,
            zero: 0,
            infinity: Infinity,
            minusInfinity: -Infinity
        }, "NaN, 0, Infinity и -Infinity возвращаются");
    });

    QUnit.test("Работает с объектами и массивами", function(assert) {
        const result = compressObject({
            object: {age: 22},
            emptyObject: {},
            emptyArray: [],
            array: [15, 6, 2005],
        });

        assert.deepEqual(result, {
            object: {age: 22},
            emptyObject: {},
            emptyArray: [],
            array: [15, 6, 2005]
        }, "Объекты и массивы возвращаются");
    });

    QUnit.test("Правильная обработка типов данных, отличных от объекта", function(assert) {
        const result = compressObject(42, null, undefined, "Today is a good day");

        assert.deepEqual(result, {}, "Поданные на вход значения не являются объектами или null");
    });
});
