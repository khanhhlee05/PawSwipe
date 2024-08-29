'use client'

import Header from "./Header.js";
import PetCards from "./Cards.js";
import { Container } from "@mui/material";
export default function Dashboard() {
  return (
    <Container>
      <Header />
      <PetCards />
    </Container>
  );
}
