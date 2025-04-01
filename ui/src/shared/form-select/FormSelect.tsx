import {
    FormControl,
    FormLabel,
    Select,
    MenuItem
} from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface FormSelectProps {
    name: string;
    label: string;
    control: Control<any, any>;
    options: FormSelectOption[];
    defaultValue?: any;
}

interface FormSelectOption {
    value: string;
    label: string;
}

export default function FormSelect({
    name,
    label,
    control,
    options,
    defaultValue = undefined
}: FormSelectProps) {
    const labelId = `${name}-label`;
    return (
        <FormControl fullWidth>
            <FormLabel>{label}</FormLabel>
            <Controller
                control={control}
                render={({ field }) => (
                    <Select labelId={labelId} label={label} defaultValue={options[0].value} onChange={(e) => field.onChange(e)}>
                        {options.map((option: FormSelectOption) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
                defaultValue={defaultValue ?? options[0].value}
                name={name}
            />
        </FormControl>
    );
};
