// import { Box, FormHelperText, FormLabel, SxProps, Theme } from '@mui/material';
// import React from 'react';
// import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
// import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';

// type SimpleOtpFieldProps<T extends FieldValues> = MuiOtpInputProps & {
//   control: Control<T>;
//   name: FieldPath<T>;
//   label?: string;
//   formLabelSx?: SxProps<Theme>;
// };

// export default function SimpleOtpField<T extends FieldValues>({
//   label,
//   name,
//   control,
//   formLabelSx,
//   ...rest
// }: SimpleOtpFieldProps<T>) {
//   return (
//     <>
//       <FormLabel
//         htmlFor={name}
//         sx={{
//           color: 'common.black',
//           fontWeight: 600,
//           width: '100%',
//           display: 'inline-block',
//           paddingBlock: 1,
//           ...formLabelSx,
//         }}
//       >
//         {label}
//       </FormLabel>

//       <Controller
//         name={name}
//         control={control}
//         rules={{ validate: (value) => value.length === 6 }}
//         render={({ field, fieldState }) => (
//           <Box>
//             <MuiOtpInput
//               sx={{ gap: 1 }}
//               {...field}
//               onChange={field.onChange}
//               value={field.value}
//               length={6}
//               {...rest}
//             />
//             {fieldState.invalid ? (
//               <FormHelperText error>OTP invalid</FormHelperText>
//             ) : null}
//           </Box>
//         )}
//       />
//     </>
//   );
// }
