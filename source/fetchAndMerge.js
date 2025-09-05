'use strict';

/**
 * Функция для загрузки и объединения данных с нескольких URL
 *
 * @param {Array<string>} urls - Массив URL для загрузки данных
 * @returns {Promise<Object>} Объект с объединенными данными, где значения могут быть одиночными или массивами
 * уникальных значений
 *
 * @example
 * const urls = ['https://vk.example.com/vkid',
 *             'https://mailru.example.com/mailid',];
 * const result = await fetchAndMergeData(urls);
 * //   result: {
 * //              "age": [25, 22],
 * //              "id": [1, 2],
 * //              "name": ["Олег", "Мария"],
 * //              "surname": ["Петров", "Иванова"],
 * //              "status": ["Дуров, верни стену!"],
 * //          }
 */
async function fetchAndMergeData(urls) {
    if (!Array.isArray(urls)) return null;

    const mergedData = {};

    const responses = await Promise.allSettled(
        urls.map(async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) return null;

                return await response.json();
            } catch {
                return null;
            }
        })
    );

    responses.forEach(response => {
        const data = response.value;
        if (typeof data == "object") {
            for (let key in data) {
                const value = data[key];

                if (!(key in mergedData)) {
                    mergedData[key] = Array.isArray(value) ? value : [value];
                } else {
                    if (Array.isArray(value)) {
                        value.forEach(val => {
                            if (!mergedData[key].includes(val)) {
                                mergedData[key].push(val);
                            }
                        });
                    } else {
                        if (!mergedData[key].includes(value)) {
                            mergedData[key].push(value);
                        }
                    }
                }
            }
        }
    });

    return mergedData;
}