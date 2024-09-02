"use client";  // Ensures it's treated as a Client Component

import { Container, Box, AppBar, Toolbar, Typography } from "@mui/material";
import './productList.css';

// Sample data
const samplePets = [
  { id: 1, name: "Bella", breed: "Labrador", age: "2 years" },
  { id: 2, name: "Max", breed: "German Shepherd", age: "3 years" },
  { id: 3, name: "Luna", breed: "Golden Retriever", age: "1 year" },
  { id: 4, name: "Charlie", breed: "Bulldog", age: "4 years" },
  { id: 5, name: "Lucy", breed: "Beagle", age: "2 years" },
  { id: 6, name: "Cooper", breed: "Poodle", age: "5 years" },
  { id: 7, name: "Bailey", breed: "Rottweiler", age: "3 years" },
  { id: 8, name: "Daisy", breed: "Shih Tzu", age: "4 years" },
  { id: 9, name: "Rocky", breed: "Boxer", age: "6 years" },
  { id: 10, name: "Sadie", breed: "Border Collie", age: "1 year" },
];

const handlePetClick = (pet) => {
  // Action to perform on click
  alert(`Clicked on ${pet.name}`);
};

const PetList = () => {
  return (
    <Container
      maxWidth="100vw"
      sx={{
        background: "rgb(238,174,202)",
        background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        backgroundPosition: 'center',
        minHeight: '100vh',
        overflow: 'hidden', // Prevent page scrolling
        py: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'rgba(135, 62, 113, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          width: '100%',
          maxWidth: '1200px',
          height: '700px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: 'transparent', width: '100%', mb:5}}>
          <Toolbar>
            <Typography className="professional-text-title"
              sx={{ fontSize: { xs: '2rem', sm: '3rem', mt: 5}, flexGrow: 1 }}
            >
              PawSwipe
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="product-list-container">
          <div className="product-list-box">
            <section className="products-container">
              <div className="product-list-product-wrapper">
                {samplePets.map((pet) => (
                  <div
                    key={pet.id}
                    className="product-item"
                    onClick={() => handlePetClick(pet)}
                  >
                    <p>{pet.name}</p>
                    <p>{`Breed: ${pet.breed}`}</p>
                    <p>{`Age: ${pet.age}`}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default PetList;
