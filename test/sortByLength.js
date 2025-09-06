'use strict';

QUnit.module("Тестируем функцию sortByLength", function() {
    QUnit.test("Правильно сортирует строки по длине", function(assert) {
        const result = sortByLength(["apple", "banana", "kiwi", "fig", "grape"]);

        assert.deepEqual(result, ["fig", "kiwi", "apple", "grape", "banana"], "Строки должны быть отсортированы по длине.");
    });

    QUnit.test("Правильно сортирует строки с одинаковой длиной", function(assert) {
        const result = sortByLength(["cat", "bat", "ant", "dog"]);

        assert.deepEqual(result, ["ant", "bat", "cat", "dog"], "Строки с одинаковой длиной должны быть отсортированы в алфавитном порядке.");
    });

    QUnit.test("Правильно сортирует массив с одной строкой", function(assert) {
        const result = sortByLength(["hello"]);

        assert.deepEqual(result, ["hello"], "Массив с одной строкой должен вернуть ту же строку.");
    });

    QUnit.test("Правильно сортирует массив с одинаковыми строками", function(assert) {
        const result = sortByLength(["hello", "hello", "hello", "hello", "hello", "hello", "hello", "hello"]);

        assert.deepEqual(result, ["hello", "hello", "hello", "hello", "hello", "hello", "hello", "hello"], "Массив с одинаковыми строками должен вернуть такой же массив");
    });
    QUnit.test("Правильно обрабатывает пустой массив", function(assert) {
        const result = sortByLength([]);
        assert.deepEqual(result, [], "Пустой массив должен вернуть пустой массив.");
    });
    QUnit.test("Правильно сортирует строки с цифрами и другими символами", function(assert) {
        const result = sortByLength(["cat1542", "bat!", "a2nt", "???dog"]);
        assert.deepEqual(result, ["a2nt", "bat!", "???dog", "cat1542"], "Массив должен быть отсортирован верно вместе с цифрами и спецсимволами");
    });
});