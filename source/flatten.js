/**
 * Функция, определяющая максимальное число в массиве
 * @param numbers - массив сотстоящий из чисел или массивов
 * 
 * @example
 * // returns [1, 2, 3]
 * flatten([1, [2, [3]]]);
 * 
 * @returns - Массив чиcел
 */
const flatten = (numbers) => {
    return numbers.reduce(
        (acc, cur) => acc.concat(cur instanceof Array ? flatten(cur) : cur),
        []
    );
}