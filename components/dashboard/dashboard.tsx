"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import Header from "./Header.js";
import PetCards from "./Cards.js";
import { Container, Button } from "@mui/material";
import { Google } from "@mui/icons-material";
const DashboardComponent = () => {
  const { data: session } = useSession();
  return (
    <Container>
      {session ? (
        <div>
          <Header />
          <PetCards />
        </div>
      ) : (
        <div>
          <h1>You're not logged in.</h1>
          <Button onClick={() => signIn("google")} variant="contained" startIcon={<Google />}>
            Sign in
          </Button>
        </div>
      )}
    </Container>
  );
};

export default DashboardComponent;
