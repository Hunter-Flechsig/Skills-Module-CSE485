import { CardModel } from "@/models/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface ShowCardsProps {
  cards: CardModel[];
  handleCardClick?: (card: CardModel) => void;
}

function ShowCards({ cards, handleCardClick }: ShowCardsProps) {
  return (
    <div className="mt-8">
      <div className="border rounded-lg h-[600px] overflow-y-auto bg-gray-50 p-2">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map(
            (card) =>
              card.image && (
                <div key={card.id} className="w-full h-full">
                  <Button
                    asChild
                    className="w-full h-full p-0 hover:opacity-80 transition-opacity duration-200"
                    onClick={() => {
                      if (handleCardClick) {
                        handleCardClick(card);
                      } else {
                        console.log("Card clicked:", card);
                      }
                    }}
                  >
                    <Image
                      src={card.image}
                      alt={`Image for ${card.name}`}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover translate-y-1 hover:translate-y-0 transition-transform duration-200"
                    />
                  </Button>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowCards;
