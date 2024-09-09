"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Header from "./Header.js";
import PetCards from "./Cards.js";
import { Container, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation.js";
import { useEffect } from "react"; // Add this import
import { CircularProgress } from "@mui/material";

const DashboardComponent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") return; // wait for session to load
    if (!session) {
      router.push("login"); // Redirect to login if not logged in
    }
  }, [session, router, status]); // Dependency array

  return (
    <Container>
      {session ? (
        <div>
          <Header />
          <PetCards />
        </div>
      ) : (
        <Box
          sx={{
            position: "fixed", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default DashboardComponent;
