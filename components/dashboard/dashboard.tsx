"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Header from "./Header.js";
import PetCards from "./Cards.js";
import { Container } from "@mui/material";

const DashboardComponent = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <Container>
          <Header />
          <PetCards />
        </Container>
      ) : (
        <h1>You're not logged in.</h1>
      )}
    </div>
  );
};

export default DashboardComponent;
