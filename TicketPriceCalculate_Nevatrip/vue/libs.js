const options = {
    date: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    },
    time: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    },
};

/**
 * Возвращает одну из трех форм слова, в зависимости от числа
 * @param number { number }
 * @param textForms { string[] }
 * @returns { string }
 */
export const declOfNum = (number, textForms = ['билет', 'билета', 'билетов']) => {
    number = Math.floor(Math.abs(number)) % 100;
    if (number > 10 && number < 20) return textForms[2];
    number %= 10;
    if (number > 1 && number < 5) return textForms[1];
    if (number === 1) return textForms[0];
    return textForms[2];
};

/**
 * Возвращает подготовленное для вывода расписание
 * @param timetable { Date[] }
 * @param timezone {{ diff: number, title: string }}
 * @returns {*[]}
 */
export const formatTimetable = (timetable, timezone) => {
    if (timezone && timezone.diff) return timetable.map((date) => {
        const title = timezone.title ? `, ${timezone.title}` : '';
        const dateAsString = `${date.toLocaleString('ru', options.time)}${title}`;
        const localDate = new Date(date);
        localDate.setMinutes(localDate.getMinutes() + timezone.diff);
        const localDateAsString = localDate.toLocaleString('ru', options.date);
        return {
            value: localDate,
            asString: `${localDateAsString} (${dateAsString})`,
        };
    });
    return timetable.map((date) => ({
        value: date,
        asString: date.toLocaleString('ru', options.date),
    }));
}

export const getDateOptions = options.date;

/**
 * Возвращает текущую дату и время в локализованном формате в виде строки
 * @returns { string }
 */
export const getCurrentDatetime = () => (new Date).toLocaleString('ru', options.date);

/**
 * Преобразует время в минутах в формат 'hh:mm'
 * @param minutes { number }
 * @returns { string }
 */
export const minutesToString = function(minutes) {
    let h = Math.floor(minutes / 60);
    const m = String(minutes % 60);
    return `${h}:${m.padStart(2, '0')}`;
};

/**
 * Преобразует список дат из строкового формата в Date-формат
 * @param dateList { string[] }
 * @returns { Date[] }
 */
export const parseDateList = (dateList) => {
    if (!Array.isArray(dateList)) return [];
    return dateList.map((el) => new Date(el));
};
