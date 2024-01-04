import { Alert, Calendar } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const CalendarForm = ({ handleDateChange }) => {
  const [value, setValue] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs());
  
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    handleDateChange(newValue);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };
  
  return (
      <div
        style={{
          width: 300,
          borderRadius: "20px"
        }}
      >
        <Alert
          message={`You selected date: ${selectedValue?.format("DD-MM-YYYY")}`}
        />
        <Calendar
          value={value}
          onSelect={onSelect}
          // headerRender={null}
          onPanelChange={onPanelChange}
        />
      </div>
  );
};

export default CalendarForm;
