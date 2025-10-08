import {id} from "date-fns/locale/id";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
    selectedDate: Date,
    onChange: (date: Date | null) => void,
}

export default function DefaultDatePicker({selectedDate, onChange}: DatePickerProps) {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={onChange}
            locale={id}
            dateFormat="dd-MM-yyyy"
            placeholderText="Pilih tanggal (dd-MM-yyyy)"
            className="form-control" />
    )
}