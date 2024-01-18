import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from 'react';
import 'dayjs/locale/ko';

const ScheduleDateTimePicker = ({setScheduleDate}) => {


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} locale="ko">
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DateTimePicker
                    format='YYYY-MM-DD HH:mm' // 날짜 형태
                    label="날짜와 시간을 선택하세요"
                    closeOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                    minDateTime={dayjs()}
                    onChange={(newValue) => {
                        setScheduleDate(dayjs(newValue.$d).format('YYYY-MM-DD HH:mm'));                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default ScheduleDateTimePicker;