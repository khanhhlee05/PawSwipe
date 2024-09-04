"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Header from "./Header.js";
import PetCards from "./Cards.js";
import { Container, Button } from "@mui/material";
import { useRouter } from "next/navigation.js";
import { useEffect } from 'react'; // Add this import

const DashboardComponent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);
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
        <h1>Loading...</h1> // Change loading state to be an animation
      )}
    </Container>
  );
};

export default DashboardComponent;
