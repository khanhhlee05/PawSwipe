'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import validator from 'validator';
import './globals.css'; 


export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      loadEmail()
    }
  }

  const loadEmail = async () => {
    const trimEmail = email.trim();
    if (!trimEmail) {
      alert("Please enter a valid email");
      return;
    }

    if (!validator.isEmail(trimEmail)) {
      alert("Please enter a valid email format");
      return;
    }

    setIsLoading(true);

    try {
      const myEmail = await fetch(`/api/user/${encodeURIComponent(trimEmail)}`, {
        method: "GET",
      });
      console.log(myEmail);
      if (myEmail.ok) {
        alert(`Welcome back, ${trimEmail}! You are in. Please stay tuned for updates`);
        setEmail("");
        setIsLoading(false); 
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
        body: JSON.stringify({ email : trimEmail }),
      });

      console.log(response);
      if (!response.ok) {
        alert("Failed to load email");
      } else {
        alert(`Welcome, ${trimEmail}!`);
        setEmail("");
      }

    } catch (err) {
      console.log(err);
      alert("Failed to load email. Please try again.");
    } finally {
      setIsLoading(false); 
    }


  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ 
        pl: { xs: 6, sm: 8 }, 
        pr: { xs: 2, sm: 4 }, 
        backgroundImage: 'url(/background1.jpg)', 
        backgroundSize: 'cover', 
        textAlign: 'left', 
      }}
    >
      <Typography 
        gutterBottom
        className="professional-text-title" 
        sx={{ fontSize: { xs: '2rem', sm: '3rem' } }} 
      >
        PawSwipe is launching soon... 
      </Typography>
      <Typography 
        variant="h4" 
        gutterBottom
        className="professional-text-subtitle" 
        sx={{ 
          fontSize: { xs: '1.25rem', sm: '2rem' }, 
          paddingBottom: '20px', 
          paddingTop: '20px',
        }}
      >
        Join our Waitlist and be the first to use PawSwipe!
      </Typography>
      <Box mb={4} width="100%" maxWidth="400px" className="feedback-glow-container">
        <TextField
          label="Email address..."
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover fieldset': {
                borderColor: 'rgba(51, 51, 51, 0.6)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(51, 51, 51, 0.6)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(51, 51, 51, 0.6)',
            },
            '& .MuiInputBase-input': {
              color: '#333',
            },
          }}
        />
      </Box>
      <Box>
        <Button 
          variant="contained" 
          color="primary"
          className="button glowing-border"
          sx={{
            backgroundColor: '#8A7D72',
            borderRadius: '30px',
            padding: '10px 20px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#705E52',
            },
          }}
          onClick={loadEmail}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Join now'}
        </Button>
      </Box>
    </Box>
  );
}
