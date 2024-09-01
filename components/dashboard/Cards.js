"use client";

import "./PetCards.css";
import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { collection, onSnapshot } from "firebase/firestore"; // Import necessary functions
import database from "@/firebase";

const PetCards = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const petsCollection = collection(database, "pets");
    const unsubscribe = onSnapshot(petsCollection, (snapshot) =>
      setPets(snapshot.docs.map((doc) => doc.data()))
    );

    return () => unsubscribe();
  }, []);
  return (
    <div className="card_container">
      {pets.map((pet) => (
        <TinderCard
          className="swipe"
          key={pet.name}
          preventSwipe={["up", "down"]}
        >
          <div className="card" style={{ backgroundImage: `url(${pet.url})` }}>
            <h3>{pet.name}</h3>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};
export default PetCards;
