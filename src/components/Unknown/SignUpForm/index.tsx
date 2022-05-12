import React, { useState } from 'react';
import { Formik } from 'formik';
import { Box } from '@mui/system';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { object, ref, string } from 'yup';

export interface IFormValues {
  email: string;
  fullName: string;
  password: string;
  checkPassword: string;
}

export interface INewUser {
  email: string;
  name: string;
  password: string;
}

type Props = {
  handleFormSubmit: (values: INewUser) => void;
  buttonLabel: string;
};

// SigUp Validation
// check spaces'/\S/'
// check uppercase regexp '/^\p{Lu}/u'
const signUpValidation = object().shape({
  email: string()
    .email('email example [ user@voypost.com ]')
    .required(`Email is required`),

  fullName: string()
    .min(5, 'Full Name must be at least 4 characters')
    .test(
      'two-words',
      () => `Two words with single space between them are required`,
      (value) => {
        const twoWordsCheck = value
          ?.split(' ')
          .filter((word) => /\S/.test(word));
        if (twoWordsCheck?.length !== 2) {
          return false;
        }
        return true;
      },
    )
    .test(
      'Uppercase-first-letter',
      () => `Each word must start with a capital letter`,
      (value) => {
        const uppercaseCheck = value
          ?.split(' ')
          .filter((word) => /^\p{Lu}/u.test(word));
        if (uppercaseCheck?.length !== 2) {
          return false;
        }
        return true;
      },
    ),

  password: string().min(6).max(30).required(`Password 'is required'`),
  checkPassword: string().when('password', {
    is: (val: string) => !!(val && val.length > 0),
    then: string().oneOf(
      [ref('password')],
      'Both passwords need to be the same',
    ),
  }),
});

const SignUpForm: React.FC<Props> = ({ handleFormSubmit, buttonLabel }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [checkPasswordShown, setCheckPasswordShown] = useState(false);

  const handleClickShowPassword = (option: string) => {
    switch (option) {
      case 'password':
        setPasswordShown(!passwordShown);
        break;
      case 'checkPassword':
        setCheckPasswordShown(!checkPasswordShown);
        break;

      default:
        break;
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const initialFormValues: IFormValues = {
    email: '',
    fullName: '',
    password: '',
    checkPassword: '',
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={signUpValidation}
      validateOnBlur
      validateOnChange
      onSubmit={(values: IFormValues) => {
        const newUser = {
          email: values.email,
          name: values.fullName.trim(),
          password: values.password,
        };

        handleFormSubmit(newUser);
      }}
    >
      {(formik) => (
        <Box
          id="product_form"
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ marginTop: 2 }}
        >
          <TextField
            fullWidth
            required
            autoFocus
            id="email"
            name="email"
            label="Email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ marginBottom: 5 }}
          />

          <TextField
            fullWidth
            required
            id="fullName"
            name="fullName"
            label="Full name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            sx={{ marginBottom: 5 }}
          />

          <TextField
            fullWidth
            required
            id="password"
            name="password"
            label="Password"
            type={passwordShown ? 'text' : 'password'}
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ marginBottom: 5 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('password')}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {passwordShown ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            required
            id="checkPassword"
            name="checkPassword"
            label="Check-password"
            type={checkPasswordShown ? 'text' : 'password'}
            value={formik.values.checkPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.checkPassword &&
              Boolean(formik.errors.checkPassword)
            }
            helperText={
              formik.touched.checkPassword && formik.errors.checkPassword
            }
            sx={{ marginBottom: 5 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle checkPassword visibility"
                    onClick={() => handleClickShowPassword('checkPassword')}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {checkPasswordShown ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" fullWidth type="submit">
            {buttonLabel}
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default SignUpForm;
