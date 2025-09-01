'use strict';

QUnit.module("Тестируем функцию templateEngine", function() {
    QUnit.test("Работает правильно с простым шаблоном с одной переменной", function(assert) {
        const template = "Привет, {{name}}!";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк!");
    });

    QUnit.test("Работает правильно с шаблоном с отсутствующими переменными", function(assert) {
        const template = "Привет, {{name}}! Тебе {{age}} лет.";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);

        assert.equal(result, "Привет, Технопарк! Тебе  лет."); // Возраст не найден, заменён на пустую строку
    });

    QUnit.test("Работает правильно с шаблоном с вложенными переменными", function(assert) {
        const template = "Город: {{address.city}}, Улица: {{address.street}}";
        const data = { address: { city: "Москва", street: "2-я Бауманская" } };
        const result = templateEngine(template, data);

        assert.equal(result, "Город: Москва, Улица: 2-я Бауманская");
    });

    QUnit.test("Работает правильно с пустым объектом", function(assert) {
        const template = "Город: {{address.city}}, Улица: {{address.street}}";
        const data = {};
        const result = templateEngine(template, data);

        assert.equal(result, "Город: , Улица: ");
    });

    QUnit.test("Работает правильно c несколькими одинаковыми переменными", function(assert) {
        const template = "Привет, {{name}}! Hi, {{name}}!";
        const data = { name: "Tехнопарк" };
        const result = templateEngine(template, data);
        
        assert.equal(result, "Привет, Tехнопарк! Hi, Tехнопарк!");
    });

    QUnit.test("Работает правильно c null и undefined значениями", function(assert) {
        const template = "Null: {{nullValue}}, Undefined: {{undefinedValue}}";
        const data = { nullValue: null, undefinedValue: undefined };
        const result = templateEngine(template, data);
        
        assert.equal(result, "Null: , Undefined: ");
    });

    QUnit.test("Работает правильно c пустой строкой как значением", function(assert) {
        const template = "Имя: '{{name}}'";
        const data = { name: "" };
        const result = templateEngine(template, data);
        
        assert.equal(result, "Имя: ''");
    });

    QUnit.test("Работает правильно c глубокой вложенностью", function(assert) {
        const template = "Значение: {{a.b.c.d.e.f}}";
        const data = { a: { b: { c: { d: { e: { f: "значение" } } } } } };
        const result = templateEngine(template, data);
        
        assert.equal(result, "Значение: значение");
    });

    QUnit.test("Работает правильно c шаблоном без переменных", function(assert) {
        const template = "Простой текст без переменных";
        const data = { name: "Технопарк" };
        const result = templateEngine(template, data);
        
        assert.equal(result, "Простой текст без переменных");
    });

    QUnit.test("Работает правильно c неполными фигурными скобками", function(assert) {
        const template = "{Текст} о {{name}}";
        const data = { name: "Технопарке" };
        const result = templateEngine(template, data);
        
        assert.equal(result, "{Текст} о Технопарке");
    });

});

