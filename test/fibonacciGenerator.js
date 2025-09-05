'use strict';

QUnit.module("Тестируем функцию fibonacciGenerator", function() {
    QUnit.test("Правильно генерирует первое число Фибоначчи", function(assert) {
        const fibGen = fibonacciGenerator(1);

        assert.deepEqual([...fibGen], [0], "Должно быть сгенерировано только первое число Фибоначчи.");
    });
    QUnit.test("Правильно генерирует 5 первых чисел Фибоначчи", function(assert) {
        const fibGen = fibonacciGenerator(5);

        assert.deepEqual([...fibGen], [0, 1, 1, 2, 3], "Должны быть сгенерированы первые 5 чисел Фибоначчи.");
    });
    QUnit.test("Работает правильно с отрицательным числом чисел", function(assert) {
        const fibGen = fibonacciGenerator(-5);

        assert.deepEqual([...fibGen], [], "Генерация отрицательного числа должна вернуть пустой массив.");
    });
    QUnit.test('Возвращает пустой массив при n = 0', function (assert) {
        const fibGen = fibonacciGenerator(0);
        assert.deepEqual([...fibGen], [], 'n=0 -> []');
    });
    QUnit.test('Игнорирует нецелые значения n', function (assert) {
        const fibGen = fibonacciGenerator(3.7);
        assert.deepEqual([...fibGen], [], 'нецелое n -> []');
    });
    QUnit.test('Правильно генерирует первые 10 чисел', function (assert) {
        const fibGen = fibonacciGenerator(10);
        assert.deepEqual([...fibGen], [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], 'n=10 -> корректная последовательность');
    });
});
