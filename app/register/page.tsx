import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import RegisterForm from "./form";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <RegisterForm />
  );
};

export default page;
