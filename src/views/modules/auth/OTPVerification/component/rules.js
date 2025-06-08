 import * as Yup from 'yup';
 
 export const verifyOtpValidation =   Yup.object({
      otp0: Yup.string().matches(/^\d$/, 'Required').required('Required'),
      otp1: Yup.string().matches(/^\d$/, 'Required').required('Required'),
      otp2: Yup.string().matches(/^\d$/, 'Required').required('Required'),
      otp3: Yup.string().matches(/^\d$/, 'Required').required('Required'),
      otp4: Yup.string().matches(/^\d$/, 'Required').required('Required'),
      otp5: Yup.string().matches(/^\d$/, 'Required').required('Required'),
    })