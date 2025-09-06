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


    QUnit.test("Работает правильно с плоским вложенным массивом", function(assert) {
        const result = flatten([[1], [2], [3]]);

        assert.deepEqual(result, [1, 2, 3]);
    });

    QUnit.test("Работает правильно с произвольно вложенным массивом с несколькими уровнями", function(assert) {
        const result = flatten([[[1]], [2, [[3, 4], 5]], 6]);
        assert.deepEqual(result, [1, 2, 3, 4, 5, 6]);
    });

    QUnit.test("Работает правильно с пустым вложенным массивом", function(assert) {
        const result = flatten([[[[[[[]]]]]]]);
        assert.deepEqual(result, []);
    });
    QUnit.test("Работает правильно с различными простыми типами во вложенном массиве", function(assert) {
        const result = flatten([['c', 1.111111111, 9, [], [true], [null]], undefined, "vsfjklddn"]);
        assert.deepEqual(result, ['c', 1.111111111, 9, true, null, undefined, "vsfjklddn"]);
    });
});
