/**
 * Функция, определяет корректные email адреса в заданной стоке и
 * возвращает количеcтсво email, список уникальных email, самый частотный email
 * @param {string|String} rawString - строка
 *
 * @returns {{
 *   emailCount: number,
 *   uniqueEmails: Array<string>,
 *   mostFrequentEmail: string
 * }|undefined}
 *
 * @example
 * const result = emailAnalyzer("test@mail.com, user@mail.com");
 * // result.emailCount === 2
 * // result.uniqueEmails = ['test@mail.com', 'user@mail.com']
 * // result.mostFrequentEmail = 'test@mail.com'
 */
function emailAnalyzer(rawString) {
    if (typeof rawString !== "string" && !(rawString instanceof String)) {
        return undefined;
    }
    const REGULAR_OF_EMAIL= /(?:[a-zA-Z0-9_%+-]+\.?)+[a-zA-Z0-9_%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/g;
    let emails = rawString.match(REGULAR_OF_EMAIL) ?? [];
    let normalizedEmails = emails.map((email) => email.toLowerCase());

    let uniqueEmailsMap = new Map();
    normalizedEmails.forEach((email)=> uniqueEmailsMap.set(email, (uniqueEmailsMap.get(email) ?? 0)+1));

    let maxKey = null;
    let maxFreq = -Infinity;
    uniqueEmailsMap.forEach((freq, key) => {
        if (freq > maxFreq) {
            maxFreq = freq;
            maxKey = key;
        }
    })

    return {
        emailCount: normalizedEmails.length,
        uniqueEmails: [...uniqueEmailsMap.keys()],
        mostFrequentEmail: maxKey ?? '',
    }
}
