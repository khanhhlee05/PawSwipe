"use client";

import "./PetCards.css";
import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { collection, onSnapshot } from "firebase/firestore"; // Import necessary functions
import database from "@/firebase";

const PetCards = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('/api/pets',{
          method: 'GET'
        });
        const data = await response.json();
        setPets(data);
      
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);


  const onSwipe = async (direction, pet) => {
    console.log(`You swiped ${pet._id} ${direction}`);
    if (direction === "right"){
      //Save pets to the wishlist array
      const email = "kle01@villanova.edu" || " " //TODO: get the user'a email based on authenticated credentials
      const updatedWishList = await fetch(`/api/user/${email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({wishlist: [`${pet._id}`]})
      })
    } 

  }
  return (
    <div className="card_container">
      {pets.map((pet) => (
        <TinderCard
          className="swipe"
          key={pet._id}
          preventSwipe={["up", "down"]}
          onSwipe={(direction) => onSwipe(direction, pet)}
        >
          {/* style={{ backgroundImage: `url(${pet.url})` }} */}
          <div className="card" style ={{backgroundColor: "black"}} >
            <h3>{pet._id}</h3>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};
export default PetCards;
