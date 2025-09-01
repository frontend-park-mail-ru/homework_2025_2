'use strict';

QUnit.module("Тестируем функцию flatten", function() {
    QUnit.test("Работает правильно с плоским массивом", function(assert) {
        const result = flatten([1, 2, 3]);

        assert.deepEqual(result, [1, 2, 3]);
    });

    QUnit.test("Работает правильно с вложенным массивом с несколькими уровнями", function(assert) {
        const result = flatten([1, [2, [3, 4], 5], 6]);
        assert.deepEqual(result, [1, 2, 3, 4, 5, 6]);
    });

    QUnit.test("Работает правильно с пустым массивом", function(assert) {
        const result = flatten([]);
        assert.deepEqual(result, []);
    });
    
    QUnit.test("Доп тест", function(assert) {
        const result = flatten([7, 7, [7, 7, [7, 7, 7]]]);
        assert.deepEqual(result, [7]);
    });
    
    QUnit.test("Доп тест", function(assert) {
        const result = flatten([1, 1, [2, 1, [1, 1, 3]]]);
        assert.deepEqual(result, [1, 2, 3]);
    });
    
    QUnit.test("Доп тест", function(assert) {
        const result = flatten([[0], [2], [[1],[11],[[111],[12]]]]);
        assert.deepEqual(result, [0, 2, 1, 11, 111, 12]);
    });

    QUnit.test("Доп тест", function(assert) {
        const result = flatten([[], [], [[], [1], [[], [2]]]]);
        assert.deepEqual(result, [1, 2]);
    });
    
    QUnit.test("Доп тест", function(assert) {
        const result = flatten([1, 2, 3, 1, 2, [1, 1], [4, 4, 5, [2, 3]]]);
        assert.deepEqual(result, [1, 2, 3, 4, 5]);
    });
});
