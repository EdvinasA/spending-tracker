import {
    FormControl,
    FormLabel,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Control, Controller } from "react-hook-form";

import utc from 'dayjs/plugin/utc'; 
dayjs.extend(utc);

interface FormDatePickerProps {
    name: string;
    label: string;
    control: Control<any, any>;
}

export default function FormDatePicker({
    name,
    label,
    control,
}: FormDatePickerProps) {
    const defaultDate = dayjs(new Date()).utcOffset(0).startOf('date');
    return (
        <FormControl fullWidth>
            <FormLabel>{label}</FormLabel>
            <Controller
                control={control}
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            onChange={(newValue) => field.onChange(dayjs(newValue).utcOffset(0).startOf('date'))}
                            defaultValue={defaultDate}
                        />
                    </LocalizationProvider>
                )}
                defaultValue={defaultDate}
                name={name}
            />
        </FormControl>
    );
};
