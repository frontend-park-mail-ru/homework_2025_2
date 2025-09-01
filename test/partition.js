/* eslint-disable require-jsdoc */

'use strict';

QUnit.module("Тестируем функцию partition", function() {
    QUnit.test("Работает правильно при разделении массива на основе предиката", function(assert) {
        const isEven = num => num % 2 === 0;
        const result = partition([1, 2, 3, 4, 5, 6], isEven);

        assert.deepEqual(result, [
            [2, 4, 6],
            [1, 3, 5]
        ]);
    });

    QUnit.test("Работает правильно при разделении с предикатом, возвращающим true для всех элементов", function(assert) {
        const isPositive = num => num > 0;
        const result = partition([1, 2, 3, 4, 5], isPositive);

        assert.deepEqual(result, [
            [1, 2, 3, 4, 5],
            []
        ]);
    });

    QUnit.test("Правильно делит массив объектов по свойству", function(assert) {
        const isAdult = person => person.age >= 18;
        const result = partition([
            { name: "Alice", age: 17 },
            { name: "Bob", age: 20 },
            { name: "Charlie", age: 15 },
            { name: "David", age: 22 }
        ], isAdult);
        assert.deepEqual(result, [
            [
                { name: "Bob", age: 20 },
                { name: "David", age: 22 }
            ],
            [
                { name: "Alice", age: 17 },
                { name: "Charlie", age: 15 }
            ]
        ]);
    });
    
    QUnit.test("Правильно обрабатывает пустой массив. Возвращает два пустых массива", function(assert) {
        const isPositive = num => num > 0;
        const result = partition([], isPositive);
    
        assert.deepEqual(result, [[], []]);
    });

    QUnit.test("Правильно работает для массива из одного элемента", function(assert) {
        const isPositive = x => x > 0;
        const result = partition([5], isPositive);

        assert.deepEqual(result, [[5], []]);
    });

    QUnit.test("Правильно работает для массива, предикат возвращает false для всех элементов", function(assert) {
        const isNegative = x => x < 0;
        const result = partition([1, 2, 3, 4, 5], isNegative);

        assert.deepEqual(result, [[], [1, 2, 3, 4, 5]]);
    });

    QUnit.test("Правильно работает со строками. Проверяет четность длины строки", function(assert) {
        const isEvenLength = str => str.length % 2 === 0;
        const result = partition(["a", "aa", "aaa", "aaaa"], isEvenLength);

        assert.deepEqual(result, [
            ["aa", "aaaa"],
            ["a", "aaa"]
        ]);
    });

    QUnit.test("Правильно работает со строками. Обрабатывает пустые строки", function(assert) {
        const isEvenLength = str => str.length % 2 === 0;
        const result = partition(["", "", ""], isEvenLength);

        assert.deepEqual(result, [
            ["", "", ""],
            []
        ]);
    });

    QUnit.test("Правильно работает с null и undefined значениями", function(assert) {
        const notNull = x => x != null;
        const result = partition([null, 1, undefined, 2], notNull);

        assert.deepEqual(result, [
            [1, 2],
            [null, undefined]
        ]);
    });
});
