import { RequestCard } from "./RequestCard";

const mockRequests = [
  {
    name: "Chance Septimus",
    service: "Men's Haircut",
    date: "08-May, 2023 Mon",
    time: "16:30-17:00",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Gretchen Levin",
    service: "Women's Haircut",
    date: "08-May, 2023 Mon",
    time: "16:30-17:00",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Marilyn Lipshutz",
    service: "Women's Haircut, Long Hair",
    date: "08-May, 2023 Mon",
    time: "16:30-17:00",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Livia Curtis",
    service: "Women's Haircut",
    date: "08-May, 2023 Mon",
    time: "16:30-17:00",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "James Septimus",
    service: "Men's Haircut",
    date: "08-May, 2023 Mon",
    time: "16:30-17:00",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Charlie Saris",
    service: "Men's Haircut",
    date: "08-May, 2023 Mon",
    time: "16:30-17:00",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Roger Westervelt",
    service: "Men's Haircut",
    date: "08-May, 2023 Mon",
    time: "16:30-17:00",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Chance Dokidis",
    service: "Men's Haircut",
    date: "08-May, 2023 Mon",
    time: "16:30-17:00",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Martin Ekstrom Bothman",
    service: "Men's Haircut",
    date: "08-May, 2023 Mon",
    time: "16:30-17:00",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Nolan Bator",
    service: "Men's Haircut",
    date: "08-May, 2023 Mon",
    time: "16:30-17:00",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&q=80",
  },
];

export const RequestCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
      {mockRequests.map((req) => (
        <RequestCard key={req.name} {...req} />
      ))}
    </div>
  );
};
