"use client";  
import { useState } from "react";
import { Container, Box, AppBar, Toolbar, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
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
  alert(`Clicked on ${pet.name}`);
};

const PetList = () => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [minAge, setMinAge] = useState("");

  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const handleMinAgeChange = (event) => {
    setMinAge(event.target.value);
  };

  const filteredPets = samplePets.filter((pet) => {
    return (
      (selectedBreed === "" || pet.breed === selectedBreed) &&
      (minAge === "" || parseInt(pet.age) >= parseInt(minAge))
    );
  });

  return (
    <Container
      maxWidth="100vw"
      sx={{
        background: "rgb(238,174,202)",
        background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        backgroundPosition: 'center',
        minHeight: '100vh',
        overflow: 'hidden', 
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
        <AppBar position="static" sx={{ backgroundColor: 'transparent', width: '100%', mb: 5 }}>
          <Toolbar>
            <Typography className="professional-text-title" sx={{ fontSize: { xs: '2rem', sm: '3rem', mt: 5 }, flexGrow: 1 }}>
              PawSwipe
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Breed</InputLabel>
            <Select
              value={selectedBreed}
              onChange={handleBreedChange}
              label="Breed"
            >
              <MenuItem value=""><em>All</em></MenuItem>
              <MenuItem value="Labrador">Labrador</MenuItem>
              <MenuItem value="German Shepherd">German Shepherd</MenuItem>
              <MenuItem value="Golden Retriever">Golden Retriever</MenuItem>
              <MenuItem value="Bulldog">Bulldog</MenuItem>
              {/* Add more breed options */}
            </Select>
          </FormControl>

          <TextField
            label="Minimum Age"
            type="number"
            value={minAge}
            onChange={handleMinAgeChange}
            variant="outlined"
          />
        </Box>

        <div className="product-list-container">
          <div className="product-list-box">
            <section className="products-container">
              <div className="product-list-product-wrapper">
                {filteredPets.map((pet) => (
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
