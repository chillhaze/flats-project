import React, { useState } from 'react';
import { Formik } from 'formik';
import { Box } from '@mui/system';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { object, string } from 'yup';

export interface IUser {
  email: string;
  password: string;
}

type Props = {
  handleFormSubmit: (values: IUser) => void;
  buttonLabel: string;
};

// SignIn Validation
const loginValidation = object().shape({
  email: string()
    .email('email example [ user@voypost.com ]')
    .required(`Email is required`),
  password: string().min(6).max(30).required(`Password is required`),
});

const LoginForm: React.FC<Props> = ({ handleFormSubmit, buttonLabel }) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const handleClickShowPassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const initialFormValues: IUser = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={loginValidation}
      validateOnBlur
      validateOnChange
      onSubmit={(values: IUser) => {
        handleFormSubmit(values);
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
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {passwordShown ? <VisibilityOff /> : <Visibility />}
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

export default LoginForm;
