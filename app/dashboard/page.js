'use client'

import DashboardComponent from "../../components/dashboard/dashboard.tsx";
import { Box } from "@mui/material";
import Header from "@/components/dashboard/Header.js";

export default function DashboardPage() {
  return (
    <Box
    width="100vw"
    height="100vh"
    sx={{ backgroundImage: 'url(/background1.jpg)', backgroundSize: 'cover', backgroundAttachment: { xs: 'fixed', sm: 'scroll' } }} >
    <Header />
    <DashboardComponent />
    </Box>
  );
}
