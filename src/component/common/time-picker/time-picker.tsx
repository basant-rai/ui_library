/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '../../../utils/cn';
import { useEffect, useState } from 'react';

interface Props {
  value?: string
  onChange: (value: string) => void;
  label?: string
  required?: boolean,
  error?: string
}

/**
 * 
 * @param param0 
 * @returns 
 */
function TimePicker({
  onChange,
  label,
  required,
  error,
  value
}: Props) {
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('00');
  const [isAm, setIsAm] = useState(false);

  useEffect(() => {
    // Only update state if the value prop changes (or on initial mount)
    if (value) {
      const [timePart, period] = value.split(' ');
      const [hourStr, minuteStr] = timePart.split(':');
      let hour = parseInt(hourStr, 10);

      if (hour === 0) hour = 12; // Midnight handling
      if (hour > 12) hour -= 12; // Convert 24-hour to 12-hour format
      const minutes = minuteStr.slice(0, 2);

      setHours(hour < 10 ? `0${hour}` : `${hour}`);
      setMinutes(minutes);
      setIsAm(period === 'AM');
    }
  }, [value]);

  useEffect(() => {
    const formattedTime = `${hours}:${minutes} ${isAm ? 'AM' : 'PM'}`;
    onChange(formattedTime);
  }, [hours, minutes, isAm])

  const handleHoursChange = (e: any) => {
    let inputHours = e.target.value;

    // Validate hours and limit to 1-12 range
    inputHours = parseInt(inputHours, 10) || 0;

    // If the input is 12, it should wrap around to 1, otherwise keep the value between 1 and 12.
    if (inputHours > 12 || inputHours === 0) {
      inputHours = 1; // Reset to 1 if invalid input (like 0 or a number greater than 12)
    }

    setHours(inputHours < 10 ? `0${inputHours}` : `${inputHours}`);
  };

  const handleMinutesChange = (e: any) => {
    let inputMinutes = e.target.value;

    // Validate minutes and limit to 0-59 range
    inputMinutes = Math.min(Math.max(parseInt(inputMinutes, 10) || 0, 0), 59);

    setMinutes(inputMinutes < 10 ? `0${inputMinutes}` : `${inputMinutes}`);
  };

  const toggleAmPm = () => {
    setIsAm((prevIsAm: any) => !prevIsAm);
  };


  // // 
  // useEffect(() => {
  //   const parseTime = (time: string) => {
  //     if (!time) return;

  //     const [hourStr, minuteStr] = time.split(':');
  //     let hour = parseInt(hourStr, 10);
  //     const minute = minuteStr.slice(0, 2);

  //     const newIsAm = hour < 12;
  //     if (hour === 0) hour = 12; // Midnight handling
  //     if (hour > 12) hour -= 12; // Convert 24-hour to 12-hour
  //     const newHours = hour < 10 ? `0${hour}` : `${hour}`;
  //     const newMinutes = minute;

  //     // Update state only if there's a difference to avoid unnecessary re-renders
  //     if (newHours !== hours || newMinutes !== minutes || newIsAm !== isAm) {
  //       setHours(newHours);
  //       setMinutes(newMinutes);
  //       setIsAm(newIsAm);
  //     }
  //   };

  //   parseTime(value || "10:00");
  // }, [value]);


  return (
    <label className={cn("block text-sm font-500")}>
      <p className={cn(
        "pb-1 font-quicksand font-600",
        error ? "text-danger" : "text-secondary-900"
      )}>
        {label}{required && <span className="text-danger">*</span>}
      </p>
      <div className="relative flex h-[46px] w-full items-center overflow-hidden rounded-lg border bg-light border-solid border-secondary-50">
        <input
          className="h-full w-full border-none pl-2.5 text-sm font-medium focus:border-none focus:outline-none focus-visible:border-none focus-visible:outline-none active:border-none active:outline-none bg-light"
          value={hours}
          onChange={handleHoursChange}
          type="number"
          name={`${name}-hours`}
        />
        <div className='className="shrink-0 px-2 text-sm font-bold border-s border-secondary-50 h-full flex items-center justify-center' />
        <input
          className="h-full w-full border-none pr-1.5 text-sm font-medium focus:border-none focus:outline-none focus-visible:border-none focus-visible:outline-none active:border-none active:outline-none bg-light"
          value={minutes}
          onChange={handleMinutesChange}
          type="number"
          name={`${name}-minutes`}
        />
        <button
          type="button"
          onClick={toggleAmPm}
          className="bg-black h-full shrink-0 border-0 px-3 font-bold text-white hover:cursor-pointer"
        >{isAm ? 'AM' : 'PM'}
        </button>
      </div>
    </label >

  );
}

export default TimePicker;