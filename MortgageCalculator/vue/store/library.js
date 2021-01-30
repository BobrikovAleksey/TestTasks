/**
 * Преобразует натуральное число в строку с разделением разрядов
 * @param num number
 * @returns {string}
 */
const separateDigits = (num) => {
    if (typeof num !== 'number') {
        return 'NaN';
    }

    if (num === 0) {
        return '';
    }

    const numAsIntUnsigned = Math.round(Math.abs(num));
    const numAsStr = String(numAsIntUnsigned);
    const result = [];

    let i = 0;
    let digit = numAsStr.slice(-3);
    while (digit.length > 0) {
        i--;
        result.unshift(digit);
        digit = numAsStr.slice((i - 1) * 3, i * 3);
    }

    return result.join(' ');
};
