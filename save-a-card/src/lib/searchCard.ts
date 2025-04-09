import { CardModel } from "@/models/card";

export async function searchCard(name: string, set: string) {

    const url = `https://api.pokemontcg.io/v2/cards?q=set.name:${set}* name:${name}*&select=name,set,images,id`

    try {
        const response = await fetch(url, {
          headers: {
            'X-Api-Key': process.env.PTCG_KEY || '',
          }
        });
    
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
    
        const { data } = await response.json();
    
        if (!Array.isArray(data)) {
          throw new Error('Unexpected response structure');
        }


        return data.map((card): CardModel => ({
            id: card.id || 'Unknown ID',
            name: card.name || 'Unknown Name',
            image: card.images?.small || null,
            setName: card.set?.name || 'Unknown Set',
        }));
      } catch (err) {
        console.error('Failed to fetch or parse cards:', err);
        return [];
      }
}