'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import validator from 'validator';

export default function Home() {
  const [email, setEmail] = useState("");

  const loadEmail = async () => {
    if (!email) {
      alert("Please enter a valid email");
      return;
    }

    if (!validator.isEmail(email)) {
      alert("Please enter a valid email format");
      return;
    }

    try{
      const myEmail = await fetch(`/api/email/${email}`);

      if (!myEmail.ok) {
        alert(`Welcome, ${email}! You are in. Please stay tuned for updates`);
        setEmail("");
        
        return;
      }
      
     
    } catch (err) {
      console.log(err);
    }

    try {
      const response = await fetch(`/api/user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log(response)

      if (!response.ok) {
        alert("Failed to load email");
      }
      const data = await response.json();
      alert(`Welcome, ${email}!`);

      setEmail("");

    } catch (err) {
      console.log(err);
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
