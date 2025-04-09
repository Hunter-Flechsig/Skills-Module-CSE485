"use server"

import { client } from "@/app/db/redis";
import { CardModel } from "../models/CardModel";

export const addPokemonAction = async (cards: CardModel[]) => {
    await client.connect();

    client.set("cards", JSON.stringify(cards))
}

export const getPokemonAction = async () => {
    await client.connect();

    const cards = await client.get("cards");
    return cards ? (JSON.parse(cards) as CardModel[]) : [];
}