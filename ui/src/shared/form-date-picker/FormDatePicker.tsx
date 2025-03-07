import {
    FormControl,
    FormLabel,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Control, Controller } from "react-hook-form";

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
    return (
        <FormControl fullWidth>
            <FormLabel>{label}</FormLabel>
            <Controller
                control={control}
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            onChange={(newValue) => field.onChange(newValue)}
                        />
                    </LocalizationProvider>
                )}
                defaultValue={dayjs(new Date())}
                name={name}
            />
        </FormControl>
    );
};
