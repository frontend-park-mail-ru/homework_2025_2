'use strict';

QUnit.module("Тестируем функцию emailAnalyzer", function () {
    QUnit.test("Работает правильно со строкой с одним email", function (assert) {
        const input = "Мой email: user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 1,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с разными регистрами email", function (assert) {
        const input = "Контакты: User@Example.com и user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 2,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с некорректными email", function (assert) {
        const input = "Некорректные email: user@, @example.com, user@domain..com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });

    QUnit.test("Работает правильно со строкой с одним email", function (assert) {
        const input = "Мой email: user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 1,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно с пустой строкой", function (assert) {
        const input = "";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });

    QUnit.test("Работает правильно с корректными и некорректными email", function (assert) {
        const input = "emails: @example.com, user@, user..user@gmail.com, admin@admin.com, user@example.ru, profile@gmail.uu ";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 4,
            uniqueEmails: ["user@gmail.com", "admin@admin.com", "user@example.ru", "profile@gmail.uu"],
            mostFrequentEmail: "user@gmail.com"
        });
    });

    QUnit.test("Работает правильно несколькими корректными email", function (assert) {
        const input = "мои email адреса: user@gmail.com, admin@admin.com, user@example.ru, profile@gmail.uu";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 4,
            uniqueEmails: ["user@gmail.com", "admin@admin.com", "user@example.ru", "profile@gmail.uu"],
            mostFrequentEmail: "user@gmail.com"
        });
    });

    QUnit.test("Работает правильно c много повторяющимся email", function (assert) {
        const input = "мои email адреса: user@gmail.com, user@gmail.com, user@gmail.com, user@gmail.com, user@gmail.com, user@gmail.com";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 6,
            uniqueEmails: ["user@gmail.com"],
            mostFrequentEmail: "user@gmail.com"
        });
    });

    QUnit.test("Работает правильно c русским языком", function (assert) {
        const input = "мои email адреса: миша@hmail.ru, example@admin.com;"
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 1,
            uniqueEmails: ["example@admin.com"],
            mostFrequentEmail: "example@admin.com"
        });
    });

    QUnit.test("Работает правильно cо спец символами", function (assert) {
        const input = "мои email адреса: №;%:?;№@hmail.ru, exa++m--p%le@admin.com; e%xa+m-&ple@admin.com"
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 2,
            uniqueEmails: ["exa++m--p%le@admin.com", "ple@admin.com"],
            mostFrequentEmail: "exa++m--p%le@admin.com"
        });
    });

    QUnit.test("Работает правильно c не строкой", function (assert) {
        const input = [1,2,3]
        const result = emailAnalyzer(input);

        assert.deepEqual(result, undefined);
    });

    QUnit.test("Работает правильно c new String", function (assert) {
        const input = new String("Мой email: user@example.com.");
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 1,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

});
