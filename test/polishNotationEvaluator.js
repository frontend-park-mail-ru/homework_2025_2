'use strict';

QUnit.module("Тестируем функцию polishNotationEvaluator", function() {
    QUnit.test("Правильно вычисляет простое выражения", function(assert) {
        const input = "+ 3 4"; // 3 + 4
        const result = polishNotationEvaluator(input);

        assert.equal(result, 7);
    });

    QUnit.test("Правильно вычисляет выражение с несколькими операциями", function(assert) {
        const input = "* + 2 3 4"; // (2 + 3) * 4
        const result = polishNotationEvaluator(input);

        assert.equal(result, 20);
    });

    QUnit.test("Правильно вычисляет выражение с отрицательными числами", function(assert) {
        const input = "- 5 + 3 2"; // 5 - (3 + 2)
        const result = polishNotationEvaluator(input);

        assert.equal(result, 0);
    });

    QUnit.test("Правильно вычисляет пустое выражение", function(assert) {
        const input = "";
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Правильно обрабатывает некорректный ввод", function(assert) {
        const input = null;
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Правильно обрабатывает выражение с делением на ноль", function(assert) {
        const input = "/ 4 0"; // 4 / 0
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Правильно обрабатывает выражение с недостающими операндами", function(assert) {
        const input = "+ 1"; // Not enough operands
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Правильно обрабатывает выражение с лишними операндами", function(assert) {
        const input = "+ 1 2 3"; // Too many operands
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Правильно обрабатывает выражение с неверным форматом", function(assert) {
        const input = "+ 1 2 a"; // Wrong tokens
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Правильно обрабатывает выражение без операндов", function(assert) {
        const input = "+";
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Правильно обрабатывает выражение с пробелами", function(assert) {
        const input = "+   1   2   "; // 1 + 2
        const result = polishNotationEvaluator(input);

        assert.equal(result, 3);
    });

    QUnit.test("Правильно обрабатывает выражение с десятичными числами", function(assert) {
        const input = "+ 1.5 2.5"; // 1.5 + 2.5
        const result = polishNotationEvaluator(input);

        assert.equal(result, 4);
    });

});