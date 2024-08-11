'use client'
import { Box, Button, TextField, Typography } from "@mui/material"
import { useState, useEffect, useRef } from 'react'
import validator from 'validator';


export default function Home() {
  const [email, setEmail] = useState("")

  const loadEmail = async () => {
    if (!email) {
      alert("Please enter a valid email"); 
      return;
    }
  
    try {
      const response = await fetch(`/api/user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to load email");
      }
  
      const data = await response.json();
      console.log(data);
      alert(`Welcome, ${data.name}!`);
      
      // Clear the TextField
      setEmail("");
  
    } catch (err) {
      console.error("Failed to load email", err);  
      alert("Failed to load email. Please try again.");
    }
  };
  
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#F5F5DC"
    >
      <Typography variant="h4" gutterBottom>
        Welcome to PawSwipe
      </Typography>
      <Box mb={2}>
        <TextField
          label="Email"
          sx={{
            width: '300px',
            '& .MuiInputBase-root': {
              padding: '5px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '15px',
            },
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box>
        <Button 
        variant="contained" 
        color="primary"
        onClick={loadEmail}>
          Submit
        </Button>
      </Box>
    </Box>

  );
}
