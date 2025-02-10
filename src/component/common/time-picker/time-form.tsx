// import { Control, Controller } from 'react-hook-form';
// import TimePicker from './time-picker'

// interface Props {
//   control: Control<any>;
//   label?: string
//   error?: string
//   name: string
// }

// /**
//  * 
//  * @returns 
//  */

// const FormTimePicker = ({
//   control,
//   label,
//   error,
//   name
// }: Props) => {
//   return (
//     <div>
//       <Controller
//         name={name}
//         control={control}
//         rules={{
//           required: 'Check-in time is required',
//           validate: (value) => {
//             const now = new Date();
//             const [time, period] = value.split(' ');
//             const [hours, minutes] = time.split(':').map(Number);
//             const isAm = period === 'AM';

//             const adjustedHours = isAm
//               ? hours % 12
//               : (hours % 12) + 12;

//             const selectedTime = new Date();
//             selectedTime.setHours(adjustedHours, minutes, 0, 0);

//             return selectedTime > now || 'The time must be later than the current time.';
//           },
//         }}
//         render={({ field }) => (
//           <TimePicker
//             value={field.value || ""}
//             onChange={field.onChange}
//             label={label}
//             required
//             error={error}
//           />
//         )}
//       />
//     </div>
//   )
// }

// export default FormTimePicker