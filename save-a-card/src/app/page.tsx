import { Card, CardContent, CardFooter } from "@/components/ui/card";
import AddCard from "@/components/addCard";

export default function Home() {
  const items = [
    {
      id: 1,
      name: "Alex Johnson",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Sam Wilson",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Jamie Smith",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Taylor Brown",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Jordan Lee",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Casey Miller",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <AddCard />
      <h1 className="text-2xl font-bold mb-6">People</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden transition-all hover:shadow-lg"
          >
            <CardContent className="p-0">{/* image here */}</CardContent>
            <CardFooter className="p-4">
              <h3 className="font-medium">{item.name}</h3>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
