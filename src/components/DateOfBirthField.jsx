import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function DateOfBirthField() {
  // Initialize state as null or a Date object
  const [dob, setDob] = useState(null);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Date of Birth (YYYY-MM-DD)
      </label>
      <div className='border border-gray-300 rounded px-2 py-1'>
        <DatePicker
          selected={dob}
          onChange={(date) => setDob(date)}
          dateFormat="yyyy-MM-dd"            // Formats the date display
          showYearDropdown                   // Allows year selection dropdown
          scrollableYearDropdown             // Makes the year dropdown scrollable
          yearDropdownItemNumber={100}         // Adjusts the number of years to show in the dropdown
          maxDate={new Date()}               // Optionally limit to dates up to today
          placeholderText="YYYY-MM-DD"       // Placeholder text when no date is selected
        />
      </div>
    </div>
  );
}

export default DateOfBirthField;
