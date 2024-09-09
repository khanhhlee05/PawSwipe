"use client";

import "./PetCards.css";
import React, { useEffect, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import { useSession } from "next-auth/react";
import {
  CardContent,
  Typography,
  Card,
  CardMedia,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
} from "@mui/material";

const PetCards = () => {
  const [pets, setPets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);
  const [open, setOpen] = useState(false);
  const cardRefs = useRef([]);

  const { data: session } = useSession();
  const user = session?.user;
 //console.log(user);

  const handleCardClick = (pet) => {
   //console.log("clicked");
    setSelectedPet(pet); // Set the selected pet
    setOpen(true); // Open the modal
  };
  const handleClose = () => {
    setOpen(false); // Close the modal
    setSelectedPet(null); // Clear selected pet
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/pets", {
          method: "GET",
        });
        const data = await response.json();
       //console.log(data);

        const email = user?.email;

        try {
          const myUser = await fetch(`/api/swipedright/${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const dataUser = await myUser.json();
          let wishList = dataUser.petId;

          let filteredData = data.filter((p) => !wishList.includes(p._id));
          setPets(filteredData);
          setCurrentIndex(filteredData.length - 1);
        } catch (error) {
          if (error.response?.status !== 404) {
            setPets(data);
            setCurrentIndex(data.length - 1);
          }
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (currentIndex < 0) {
        // No more cards to swipe
        return;
      }

      if (["ArrowLeft", "a"].includes(event.key)) {
        cardRefs.current[currentIndex]?.swipe("left"); // Trigger left swipe
      } else if (["ArrowRight", "d"].includes(event.key)) {
        cardRefs.current[currentIndex]?.swipe("right"); // Trigger right swipe
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const onSwipe = async (direction, pet) => {
    if (currentIndex >= 0) {
      setCurrentIndex(currentIndex - 1); // Move to the next card
    }
    if (direction === "right") {
      // Save pets to the wishlist array
      const email = user?.email;
      const updatedWishList = await fetch(`/api/swipedright/${email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ petId: pet._id, add: true }),
      });

      const pets = await updatedWishList.json();
     //console.log(pets);
    }
  };
  return (
    <div className="card_container">
      {pets.map((pet, index) => (
        <TinderCard
          className="swipe"
          ref={(el) => (cardRefs.current[index] = el)}
          key={pet._id}
          preventSwipe={["up", "down"]}
          onSwipe={(direction) => onSwipe(direction, pet)}
        >
          <Card
            onClick={() => handleCardClick(pet)}
            sx={{
              width: 500,
              maxWidth: "85vw",
              height: "50vh",
              position: "relative",
              borderRadius: 10,
              overflow: "hidden",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 3,
              },
            }}
          >
            <CardMedia
              component="img"
              image={pet.photoUrl}
              alt={pet.name}
              sx={{
                height: "100%",
                objectFit: "cover",
              }}
            />
            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "3px 16px",
                }}
              >
                <Typography variant="h6" component="h2" color="white">
                  {pet.name} {pet.breed ? `| ${pet.breed}` : "Mystery"}
                </Typography>
                <Typography variant="subtitle1" component="h2" color="white">
                  {pet.location}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </TinderCard>
      ))}
      {/* Modal for pet info */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedPet?.name}</DialogTitle>
        <DialogContent>
          <img
            src={selectedPet?.photoUrl}
            alt={selectedPet?.name}
            style={{ width: "100%" }}
          />
          <Typography variant="h6">{selectedPet?.breed}</Typography>
          <Typography>{selectedPet?.description}</Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default PetCards;
