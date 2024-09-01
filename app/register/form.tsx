"use client";

import { Button, Box, Container, Typography, TextField } from "@mui/material";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext, SubmitHandler } from "react-hook-form";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "This field has to be filled.",
      })
      .email("This is not a valid email.")
      .max(100, {
        message: "Email can't be longer than 100 characters.",
      }),
    password: z
      .string()
      .min(6, { message: "Password has to be at least 6 characters long." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password has to be at least 6 characters long." }),
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

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

//   const handleSubmit = useFormContext<z.infer<typeof formSchema>>();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values: z.infer<typeof formSchema>) => {
    console.log(values.email);
  }
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log("this was called");
//     console.log(values);
//   }

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
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
          error={!!errors.email}
          helperText={errors.email?.message}
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="pawswipe@whatever.com"
        />
        {/* <TextField
          fullWidth
          label="Password"
          type="password"
          {...form.register("password")}
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
          {...form.register("confirmPassword")} 
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Confirm your password"
        /> */}
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
