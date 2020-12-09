import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
  username: yup
    .string()
    .max(10, 'Username must be less than 10 characters')
    .required('Username is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('RepeatPassword is required'),
});

export default RegisterSchema;
