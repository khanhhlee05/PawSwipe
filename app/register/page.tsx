import { authOptions } from "@/lib/authOptions";
import { Box, Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import RegisterForm from "./form";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <RegisterForm />
  );
};

export default page;
