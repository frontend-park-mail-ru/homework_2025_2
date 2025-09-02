/**
 * Функция, определяет корректные email адреса в заданной стоке и
 * возвращает количеcтсво email, список уникальных email, самый частотный email
 * @param {string} emails - строка
 *
 * @example
 * const result = analyzeEmails("test@mail.com, user@mail.com");
 * // result.emailCount === 2
 * // result.uniqueEmails = ['test@mail.com', 'user@mail.com']
 * // result.mostFrequentEmail = 'test@mail.com'
 * @returns {{
 *   emailCount: number,
 *   uniqueEmails: Array<string>,
 *   mostFrequentEmail: string
 * }}
 */
function emailAnalyzer(emails)
{
    const REGULAR_OF_EMAIL= /(?:[a-zA-Z0-9_%+-]+\.?)+[a-zA-Z0-9_%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/g;
    let normalEmails = emails.match(REGULAR_OF_EMAIL)?? [];
    normalEmails = normalEmails.map((email) => email.toLowerCase())
    let uniqueEmailsMap = new Map();
    for ( let email of normalEmails)
    {
        uniqueEmailsMap.set(email, (uniqueEmailsMap.get(email) ?? 0)+1);
    }
    let maxKey = null;
    let maxFreq = -Infinity;
    for (const [key,freq] of uniqueEmailsMap)
    {
        if (freq> maxFreq){
            maxFreq = freq;
            maxKey = key;
        }
    }
    return {
        emailCount: normalEmails.length,
        uniqueEmails: [...uniqueEmailsMap.keys()],
        mostFrequentEmail: maxKey ?? ''
    }

}
