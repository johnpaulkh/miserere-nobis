const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0 // Optional: removes the trailing ",00"
});

const noCurrencyFormatter = Intl.NumberFormat('de-DE');

type CurrencyProps = {
    value: number,
    showCurrency?: boolean,
}

export default function Currency({value, showCurrency = false} : CurrencyProps) {
    return (
        <>{showCurrency
            ? formatter.format(value)
            : noCurrencyFormatter.format(value)
        }</>
    )
}