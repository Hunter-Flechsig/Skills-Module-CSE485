"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { searchCard } from "@/lib/searchCard";
import { CardModel } from "@/models/card";
import ShowCards from "./ShowCards";
import { useAtom } from "jotai";
import { myAtom } from "@/app/atoms"; // Import the atom from atoms.ts
import { addPokemonAction } from "@/app/actions/pokemon"; // Import the action to add cards

let updateTimeout: NodeJS.Timeout;

export default function AddCard() {
  const [name, setName] = useState("");
  const [set, setSet] = useState("");
  const [cards, setCards] = useState<CardModel[]>([]);
  const [myCards, setMyCards] = useAtom(myAtom); // Use the atom to manage state

  const handleChange = () => {
    console.log("in use effect");
    if (name && set) {
      clearTimeout(updateTimeout); // Clear the previous timeout
      updateTimeout = setTimeout(async () => {
        console.log("Searching for card:", { name, set });
        try {
          const foundCards = await searchCard(name, set);
          setCards(foundCards);
        } catch (error) {
          console.error("Error searching for card:", error);
        }
        console.log("Cards found:", cards);
      }, 500); // Adjust the debounce time as needed
    }
  };

  const handleAddCard = (card: CardModel) => {
    console.log("Card clicked:", card);
    setMyCards((prevCards) => {
      if (!prevCards.some((c) => c.id === card.id)) {
        return [...prevCards, card]; // Update the atom state if no duplicate
        // Call the action to add the card
      }
      return prevCards; // Return the same state if duplicate exists
    });
    addPokemonAction(myCards);
    // Add your logic to add the card here
  };

  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Card</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] min-w-[70vw] p-8 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center">Search Card</DialogTitle>
            <DialogDescription className="text-center">
              search card by name and set
            </DialogDescription>
            <div className="py-4">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="name" className="block mb-2">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Charizard"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      handleChange();
                    }}
                    className="col-span-1"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="set" className="block mb-2">
                    Set
                  </Label>
                  <Input
                    id="set"
                    type="text"
                    placeholder="Base Set"
                    value={set}
                    onChange={(e) => {
                      setSet(e.target.value);
                      handleChange();
                    }}
                  />
                </div>
              </div>
              <ShowCards cards={cards} handleCardClick={handleAddCard} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
