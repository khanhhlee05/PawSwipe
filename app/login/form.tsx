"use client";

import {
  Button,
  Box,
  Container,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "This field has to be filled.")
    .email("This is not a valid email.")
    .max(100, "Email can't be longer than 100 characters."),
  password: z.string().min(6, "Password has to be at least 6 characters long."),
});

type formData = z.infer<typeof formSchema>;
const LoginForm = () => {
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

  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  async function onSubmit(values: formData) {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!response?.error) {
        router.push("dashboard");
      } else {
        setSnackbarMessage(response.error);
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(error.message || "Login failed. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  /* 
  Useful to have this function to test for validation behavior
  const onError = (errors) => {
    console.log("Form submission failed due to validation errors:", errors);
  };

  console.log("Current form state:", { errors, touchedFields, isSubmitting }); 
  */

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
        noValidate
        sx={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "medium" }}
        >
          Login
        </Typography>
        <TextField
          fullWidth
          required
          label="Email"
          {...register("email")}
          //   error={!!errors.email && touchedFields.email}
          //   helperText={errors.email?.message}
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
          //   error={!!errors.password && touchedFields.password}
          //   helperText={errors.password?.message}
          required
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Enter your password"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Link href={"/register"} underline="none" color={"black"}>
            Need an account?
          </Link>
          <Button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard", 
                redirect: false,
                popup: true,
              })
            }
            variant="contained"
            size="small"
            sx={{
              marginTop: 2,
              padding: "5px 0",
              fontSize: "1rem",
              width: "auto",
              textTransform: "none",
            }}
            startIcon={<Google />}
          >
            Sign in with Google
          </Button>
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
            Login
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginForm;
