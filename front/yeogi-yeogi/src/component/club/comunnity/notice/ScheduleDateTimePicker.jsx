import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from 'react';
import 'dayjs/locale/ko';

const ScheduleDateTimePicker = () => {

    const [value, setValue] = useState();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} locale="ko">
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DateTimePicker
                    format='YYYY-MM-DD HH:MM' // 날짜 형태
                    label="날짜와 시간을 선택하세요"
                    closeOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                    showDaysOutsideCurrentMonth
                    minDateTime={dayjs()}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default ScheduleDateTimePicker;