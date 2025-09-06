'use strict';

QUnit.module("Тестируем функцию sortByFrequency", function() {
    QUnit.test("Работает правильно с сортировкой по частоте появления", function(assert) {
        const result = sortByFrequency([4, 6, 2, 6, 4, 4, 2, 2, 2]);

        assert.deepEqual(result, [2, 2, 2, 2, 4, 4, 4, 6, 6], "Массив должен быть отсортирован по частоте.");
    });

    QUnit.test("Работает правильно с пустым массивом", function(assert) {
        const result = sortByFrequency([]);

        assert.deepEqual(result, [], "Пустой массив должен вернуть пустой массив.");
    });

    QUnit.test("Работает правильно с массивом с одним элементом", function(assert) {
        const result = sortByFrequency([5]);

        assert.deepEqual(result, [5], "Массив с одним элементом должен вернуть тот же элемент.");
    });

    QUnit.test("Работает правильно с массивом из одинаковых чисел", function(assert){
        const result = sortByFrequency([10, 10, 10, 10]);

        assert.deepEqual(result, [10, 10, 10, 10], "Массив должен вернуться в изначальном виде");
    })

    QUnit.test("Работает верно с нулями и отрицательными числами", function(assert){
        const result = sortByFrequency([0,-1, -2, -3, 0, -1, -3, -3, 0, 0]);

        assert.deepEqual(result, [0, 0, 0, 0, -3, -3, -3, -1, -1, -2], "Массив должен корректно работать с нулём и отрицательными числами");
    })
});
