const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0 // Optional: removes the trailing ",00"
});

type CurrencyProps = {
    value: number,
}

export default function Currency({value} : CurrencyProps) {
    return (
        <>{formatter.format(value)}</>
    )
}