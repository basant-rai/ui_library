import { useState, useEffect, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  // eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  isBefore,
  // isAfter,
  getYear,
  setYear,
  getMonth,
  setMonth,
  // addYears,
  // subYears,
  getDaysInMonth,
  getDay,
  addDays,
  isToday,
} from "date-fns";

import { createPortal } from "react-dom";
import { cn } from "../../../utils/cn";
// import Label from "../common/label";

interface Props {
  onDateChange: any;
  name?: string;
  disabled?: boolean;
  value?: string | any
  // label?: string;
  enableTime?: boolean;
  placeholder?: string;
  range?: boolean;
  yearsRange?: number;
  size?: "sm" | "md"
}

/**
 * 
 * @param param0 
 * @returns 
 */
const DateField: React.FC<Props> = ({
  onDateChange,
  disabled,
  value,
  placeholder,
  enableTime = false,
  range = false,
  // yearsRange = 10,
  size = "md"
}) => {

  const portalRef = useRef<HTMLDivElement>(null)

  // 
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // 
  const [yearInput, setYearInput] = useState(getYear(new Date()).toString());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const sizeStyle = {
    md: "py-3.5 ",
    sm: "py-2"
  }

  useEffect(() => {
    let container = document.getElementById("calendar-portal");
    if (!container) {
      container = document.createElement("div");
      container.id = "calendar-portal";
      document.body.appendChild(container);
    }
    setPortalContainer(container);
  }, []);

  useEffect(() => {
    if (value) {
      if (range) {
        setSelectedStartDate(value?.startDate)
        setSelectedEndDate(value?.endDate)
      } else {
        setSelectedDate(value)
      }
    }
  }, [range, value])

  // Generate calendar days with proper padding
  const generateDays = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const daysInMonth = getDaysInMonth(currentMonth);
    const startWeekday = getDay(start);

    // Add padding for days from previous month
    const days = [];
    for (let i = 0; i < startWeekday; i++) {
      days.push(addDays(start, - (startWeekday - i)));
    }

    // Add current month days
    for (let i = 0; i < daysInMonth; i++) {
      days.push(addDays(start, i));
    }

    // Add padding for days from next month
    const remainingDays = 42 - days.length; // 6 weeks
    for (let i = 1; i <= remainingDays; i++) {
      days.push(addDays(end, i));
    }

    return days;
  };

  const days = generateDays();

  // Generate years list (current year ± yearsRange)
  const currentYear = getYear(new Date());
  // const years = Array.from({ length: yearsRange * 2 + 1 }, (_, i) => currentYear - yearsRange + i);

  // Months list
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    setYearInput(getYear(currentMonth).toString());
  }, [currentMonth]);

  const handleDateChange = (date: Date) => {
    if (range) {
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      } else if (selectedStartDate && !selectedEndDate) {
        if (isBefore(date, selectedStartDate)) {
          setSelectedEndDate(selectedStartDate);
          setSelectedStartDate(date);
        } else {
          setSelectedEndDate(date);
        }
      }
    } else {
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };

  const handleYearChange = (year: number) => {
    const newDate = setYear(currentMonth, year);
    setCurrentMonth(newDate);
  };

  const handleMonthChange = (monthIndex: number) => {
    setCurrentMonth(setMonth(currentMonth, monthIndex));
  };

  const isInRange = (date: Date) => {
    if (range && selectedStartDate) {
      if (selectedEndDate) {
        return isWithinInterval(date, {
          start: selectedStartDate,
          end: selectedEndDate,
        });
      } else if (hoverDate) {
        const start = isBefore(selectedStartDate, hoverDate)
          ? selectedStartDate
          : hoverDate;
        const end = isBefore(selectedStartDate, hoverDate)
          ? hoverDate
          : selectedStartDate;
        return isWithinInterval(date, { start, end });
      }
    }
    return false;
  };

  const getDayClass = (day: Date) => {
    let classes = "w-8 h-8 flex items-center justify-center rounded-full text-sm";

    // Different month days
    if (getMonth(day) !== getMonth(currentMonth)) {
      classes += " text-gray-400";
    } else {
      classes += " text-gray-800";
    }

    // Today
    if (isToday(day)) {
      classes += " font-bold border border-primary";
    }

    // Selected dates
    if (range) {
      if (selectedStartDate && isSameDay(day, selectedStartDate)) {
        classes += " bg-primary text-white";
      } else if (selectedEndDate && isSameDay(day, selectedEndDate)) {
        classes += " bg-primary text-white";
      } else if (isInRange(day)) {
        classes += " bg-blue-100";
      }
    } else if (selectedDate && isSameDay(day, selectedDate)) {
      classes += " bg-primary text-white";
    }

    // Hover effects
    if (getMonth(day) === getMonth(currentMonth)) {
      classes += " hover:bg-gray-100";
    }

    return classes;
  };

  const formatDisplayValue = () => {
    if (range) {
      if (selectedStartDate && selectedEndDate) {
        return `${format(selectedStartDate, "MM/dd/yyyy")} - ${format(
          selectedEndDate,
          "MM/dd/yyyy"
        )}`;
      } else if (selectedStartDate) {
        return `${format(selectedStartDate, "MM/dd/yyyy")} - `;
      }
      return "";
    } else {
      return selectedDate
        ? format(selectedDate, enableTime ? "MM/dd/yyyy HH:mm" : "MM/dd/yyyy")
        : "";
    }
  };

  const handleCalendarClose = () => {
    if (range && selectedStartDate && !selectedEndDate) {
      setSelectedEndDate(selectedStartDate);
    }
    setShowCalendar(false);
    setIsFocused(false);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        showCalendar &&
        !portalRef.current?.contains(target) && // main input container
        !portalContainer?.contains(target)     // calendar rendered via portal
      ) {
        handleCalendarClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar, portalContainer]);

  // const hasValue = Boolean(formatDisplayValue());
  // const shouldFloatLabel = isFocused || hasValue;

  return (
    <div className="relative w-full date-picker-container" ref={portalRef}>
      <div className="relative">
        <div
          className={cn(
            "w-full text-sm font-500 px-3 border rounded-md cursor-pointer flex items-center justify-between ",
            sizeStyle[size],
            disabled ? "bg-primary-50" : "",
            isFocused ? "border-primary " : ""
          )}
          onClick={() => {
            if (!disabled) {
              setShowCalendar(!showCalendar);
              setIsFocused(true);
            }
          }}
        >
          <span className={cn(
            !formatDisplayValue() ? "text-gray-400" : "text-gray-800"
          )}>
            {formatDisplayValue() ? formatDisplayValue() : placeholder}
            {/*  || (range ? "Select date range" : "Select a date") */}
          </span>
          <svg
            className="w-5 h-5 text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {(showCalendar && portalContainer) && (
          createPortal(
            <div
              className="absolute mt-1 bg-white shadow-lg rounded-md border border-border w-auto z-50 animate-fade-in"
              style={{
                position: "absolute",
                top: portalRef.current?.getBoundingClientRect().bottom ?? 0,
                left: portalRef.current?.getBoundingClientRect().left ?? 0,
                width: portalRef.current?.offsetWidth ?? "100%",
              }}
            >
              {/* Month/Year Navigation */}
              <div className="flex justify-between items-center px-2 py-1 border-b">
                <button
                  type="button"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-1">
                  <select
                    value={getMonth(currentMonth)}
                    onChange={(e) => handleMonthChange(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {months.map((month, idx) => (
                      <option key={month} value={idx}>
                        {month}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    value={yearInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setYearInput(value);
                        if (value.length === 4) {
                          handleYearChange(Number(value));
                        }
                      }
                    }}
                    onBlur={() => {
                      let year = parseInt(yearInput);
                      if (isNaN(year)) year = currentYear;
                      year = Math.max(1000, Math.min(9999, year));
                      setYearInput(year.toString());
                      handleYearChange(year);
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-16 focus:outline-none focus:ring-1 focus:ring-primary"
                    min="1000"
                    max="9999"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 gap-1 px-2 py-1 text-xs text-secondary font-medium">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="text-center py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1 px-2 py-1">
                {days.map((day) => (
                  <button
                    key={day.toString()}
                    type="button"
                    className={getDayClass(day)}
                    onClick={() => {
                      handleDateChange(day);
                      if (!range) {
                        onDateChange(day.toISOString());
                      }
                    }}
                    onMouseEnter={() => setHoverDate(day)}
                    onMouseLeave={() => setHoverDate(null)}
                  >
                    {format(day, "d")}
                  </button>
                ))}
              </div>

              {range && (
                <div className="flex justify-between px-2 py-1 border-t">
                  <button
                    type="button"
                    className="px-3 py-1 text-sm text-secondary hover:bg-primary-50 rounded"
                    onClick={() => {
                      setSelectedStartDate(null);
                      setSelectedEndDate(null);
                    }}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-xs bg-primary text-white font-500 rounded hover:bg-primary flex justify-center items-center"
                    onClick={() => {
                      if (selectedStartDate) {
                        const endDate = selectedEndDate || selectedStartDate;
                        onDateChange({
                          startDate: selectedStartDate.toISOString(),
                          endDate: endDate.toISOString(),
                        });
                        handleCalendarClose();
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>,
            portalContainer
          )
        )}
      </div>
    </div>
  );
};

export default DateField;