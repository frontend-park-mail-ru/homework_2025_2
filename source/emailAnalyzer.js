'use strict';

/**
 * Анализирует текст и извлекает информацию об email адресах
 * @param {string} text - текст для анализа
 * 
 * @example
 * // returns {emailCount: 1, uniqueEmails: ["user@example.com"], mostFrequentEmail: "user@example.com"}
 * emailAnalyzer("Мой email: user@example.com.");
 * 
 * @return {Object} Объект с результатами анализа
 */
const emailAnalyzer = text => { 
    const email_regs =  /[a-zA-Z0-9_%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/g;

    const emails = text.match(email_regs) ?? [];
    
    const emails_count = {};
    const lowercaseEmails = [];

    emails.forEach(email => {
        const lowercaseEmail = email.toLowerCase();
        lowercaseEmails.push(lowercaseEmail);
        emails_count[lowercaseEmail] = (emails_count[lowercaseEmail] || 0)+ 1;
    });

    let mostfrequentEmails = '';
    let max = 0;

    for (const[email, count] of Object.entries(emails_count)){
        if (count > max){
            max = count;
            mostfrequentEmails = email;
        }
    }

    const uniqueEmails = Array.from(new Set(lowercaseEmails));

    return {
        emailCount: emails.length,
        uniqueEmails: uniqueEmails,
        mostFrequentEmail: mostfrequentEmails
    };
}
