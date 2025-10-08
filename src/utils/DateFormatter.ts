export default function format(date: Date) {
    const formatter = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return formatter.format(date).replace(/\//g, '-');
}
