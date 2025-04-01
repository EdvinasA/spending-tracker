import {
    Box,
    ToggleButton,
    ToggleButtonGroup,
    IconButton,
} from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, DateView, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { DateFilter, DateFilterType } from "./Balance";


interface BalanceDatePickerProps {
    dateFilter: DateFilter;
    filterType: string;
    setDateFilter: (dateFilter: DateFilter) => void;
    setFilterType: (filterType: DateFilterType) => void;
}

export default function BalanceActions({ dateFilter, filterType, setDateFilter, setFilterType }: BalanceDatePickerProps) {
    const handleFilterTypeChange = (_: React.MouseEvent<HTMLElement>, newFilterType: DateFilterType) => {
        if (!newFilterType) return;
        setFilterType(newFilterType);

        const today = dayjs();
        setDateFilter({
            date: formatDateByFilterType(today, newFilterType)
        });
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        if (!newValue) return;
        setDateFilter({
            date: formatDateByFilterType(newValue, filterType as DateFilterType)
        });
    };

    const handleDateNavigation = (direction: 'prev' | 'next') => {
        const currentDate = dayjs(dateFilter.date);
        let newDate: Dayjs = currentDate;

        switch (filterType) {
            case 'day':
                newDate = direction === 'prev' ? currentDate.subtract(1, 'day') : currentDate.add(1, 'day');
                break;
            case 'month':
                newDate = direction === 'prev' ? currentDate.subtract(1, 'month') : currentDate.add(1, 'month');
                break;
            case 'year':
                newDate = direction === 'prev' ? currentDate.subtract(1, 'year') : currentDate.add(1, 'year');
                break;
        }

        setDateFilter({
            date: formatDateByFilterType(newDate, filterType as DateFilterType)
        });
    };

    const formatDateByFilterType = (date: Dayjs, filterType: DateFilterType): string => {
        switch (filterType) {
            case 'day':
                return date.format('YYYY-MM-DD');
            case 'month': 0
                return date.startOf('month').format('YYYY-MM-DD');
            case 'year':
                return date.startOf('year').format('YYYY-MM-DD');
        }
    };

    const getDatePickerWidth = (filterType: DateFilterType): string => {
        switch (filterType) {
            case 'day':
                return '115px';
            case 'month':
                return '60px';
            case 'year':
                return '70px';
        }
    };

    const getDatePickerViews = () => {
        switch (filterType) {
            case 'year':
                return ['year'];
            case 'month':
                return ['year', 'month'];
            default:
                return ['year', 'month', 'day'];
        }
    };

    return (
        <Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                paddingTop: '12px'
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    alignItems: "center"
                }}>
                    <ToggleButtonGroup
                        value={filterType}
                        exclusive
                        onChange={handleFilterTypeChange}
                        size="small"
                    >
                        <ToggleButton value="day">Day</ToggleButton>
                        <ToggleButton value="month">Month</ToggleButton>
                        <ToggleButton value="year">Year</ToggleButton>
                    </ToggleButtonGroup>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="small"
                            onClick={() => handleDateNavigation('prev')}
                            sx={{
                                padding: '4px 1px',
                                color: 'white'
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                sx={{
                                    width: getDatePickerWidth(filterType as DateFilterType),
                                    transition: 'width 0.2s ease-in-out'
                                }}
                                value={dayjs(dateFilter.date)}
                                onChange={handleDateChange}
                                views={getDatePickerViews() as DateView[]}
                                showDaysOutsideCurrentMonth={false}
                                format={filterType === 'day' ? 'YYYY-MM-DD' :
                                    filterType === 'month' ? 'MMM' :
                                        'YYYY'}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        InputProps: {
                                            endAdornment: null
                                        }
                                    }
                                }}
                            />
                        </LocalizationProvider>

                        <IconButton
                            size="small"
                            onClick={() => handleDateNavigation('next')}
                            sx={{
                                padding: '4px 1px',
                                color: 'white'
                            }}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}