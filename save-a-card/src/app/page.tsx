"use client";

import { useEffect } from "react";
import AddCard from "../components/addCard";
import { useAtom } from "jotai";
import { myAtom } from "@/app/atoms"; // Import the atom from atoms.ts
import { getPokemonAction } from "@/app/actions/pokemon";
import ShowCards from "@/components/ShowCards";

export default function Home() {
  const [cards, setCards] = useAtom(myAtom);

  useEffect(() => {
    async function fetchData() {
      const cardsData = await getPokemonAction(); // Fetch cards from the server
      setCards(cardsData); // Set them in the atom
    }
    fetchData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <AddCard />
      <h1>My Cards</h1>
      <ShowCards cards={cards} />
    </div>
  );
}
