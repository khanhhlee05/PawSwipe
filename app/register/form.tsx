"use client";

import {
  Button,
  Box,
  Container,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, "This field has to be filled.")
      .email("This is not a valid email.")
      .max(100, "Email can't be longer than 100 characters."),
    password: z
      .string()
      .min(6, "Password has to be at least 6 characters long."),
    confirmPassword: z
      .string()
      .min(6, "Password has to be at least 6 characters long."),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
        path: ["confirmPassword"],
      });
    }
  });
type formData = z.infer<typeof formSchema>;
const RegisterForm = () => {
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: formData) {
    console.log(values);
    const response = await fetch("api/auth/register", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await response.json();
    // if (data.error) {
    
    // } 
  }

  /* 
  Useful to have this function to test for validation behavior
  const onError = (errors) => {
    console.log("Form submission failed due to validation errors:", errors);
  };

  console.log("Current form state:", { errors, touchedFields, isSubmitting }); */

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar> */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <TextField
          fullWidth
          required
          label="Email"
          {...register("email")}
          error={!!errors.email && touchedFields.email}
          helperText={errors.email?.message}
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="pawswipe@whatever.com"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password && touchedFields.password}
          helperText={errors.password?.message}
          required
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Enter your password"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          required
          error={!!errors.confirmPassword && touchedFields.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Confirm your password"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              marginTop: 2,
              padding: "5px 0",
              fontSize: "1rem",
              width: 90,
              textTransform: "none",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
