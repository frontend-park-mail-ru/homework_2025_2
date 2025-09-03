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
    
    QUnit.test("Работает правильно с повторяющимися элементами", function(assert) {
        const result = flatten([7, 7, [7, 7, [7, 7, 7]]]);
        assert.deepEqual(result, [7, 7, 7, 7, 7, 7, 7]);
    });
    QUnit.test("Работает правильно с вложенными пустыми массивами", function(assert) {
        const result = flatten([[], [], [[], [], [[], []]]]);
        assert.deepEqual(result, []);
    });
    
    QUnit.test("Работает правильно с различными типами данных", function(assert) {
        const result = flatten([1, {"a": 1}, 3, "abc", {"a": 1}, {"b": 1}, [{"b": 1}, [1.23, {"c": 1}]]]);
        assert.deepEqual(result, [1, {"a": 1}, 3, "abc", {"a": 1}, {"b": 1}, {"b": 1}, 1.23, {"c": 1}]);
    });
    
    QUnit.test("Работает правильно с неверными входными данными", function(assert) {
        const result = flatten({ "foo": "bar" });
        assert.deepEqual(result, "Invalid input");
    });
});
