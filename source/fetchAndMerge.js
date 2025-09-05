'use strict';

/**
 * Функция загружает данные с нескольких URL и объединяет их в один объект
 * Если один ключ встречается в нескольких объектах, значения собираются в массив
 * содержащий все уникальные ключи из загруженных данных.
 * 
 * @param {string[]} urls - Массив URL для загрузки данных
 * 
 * @example
 * // Возвращает { name: ['Олег', 'Мария'], age: [25, 22] }
 * 
 * fetchAndMerge([
 *   'https://api.com/user1',
 *   'https://api.com/user2'
 * ]);
 * 
 * @returns {Object} Объединенный объект со всеми уникальными ключами и значениями
 */
const fetchAndMerge = async (urls) => {
  if (!Array.isArray(urls)) {
    throw new Error('Параметр urls должен быть массивом')
  }
  const result = {};

  for (const url of urls) {
    try {

      const response = await fetch(url);
      if (!response.ok) continue;
      
      const data = await response.json();

      if (typeof data !== 'object' || data === null) {
        console.warn(`Данные с ${url} не являются объектом`);
        continue;
      }

      for (const [key, value] of Object.entries(data)) {
        if (result[key] === undefined) {
          result[key] = [value];
        } else {
          result[key].push(value);
        }
      }
    } catch (error) {
      throw new Error(`Ошибка при обработке URL ${url}: ${error.message}`);
    }
  }
  
  for (const key in result) {
    result[key] = [...new Set(result[key])];
  }

  return result;
};
