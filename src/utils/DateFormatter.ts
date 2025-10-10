function idDateFormat(date: Date) {
    const formatter = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return formatter.format(date).replace(/\//g, '-');
}

function apiDateFormat(date: Date) {
    return date.toLocaleDateString('en-CA', { // 'en-CA' forces YYYY-MM-DD format
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

export {
    idDateFormat,
    apiDateFormat,
}
