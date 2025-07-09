import { HotelRequestCard, type IRequest } from "./HotelRequestCard";

const mockRequests: IRequest[] = [
  {
    name: "Charlie Saris",
    phone: "+1 123-456-7895",
    email: "charlie.saris@example.com",
    requestId: "1669297457",
    service: "Men's Haircut",
    date: "14-May, 2025 Sun",
    time: "15:00-15:30",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Livia Curtis",
    phone: "+1 123-456-7893",
    email: "livia.curtis@example.com",
    requestId: "1669297455",
    service: "Women's Haircut",
    date: "12-May, 2025 Fri",
    time: "13:00-13:30",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Nolan Bator",
    phone: "+1 123-456-7899",
    email: "nolan.bator@example.com",
    requestId: "1669297461",
    service: "Men's Haircut",
    date: "18-May, 2025 Thu",
    time: "19:00-19:30",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Chance Septimus",
    phone: "+1 987-654-3210",
    email: "chance.septimus@example.com",
    requestId: "1669297452",
    service: "Men's Haircut",
    date: "09-May, 2025 Tue",
    time: "10:00-10:30",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Martin Ekstrom Bothman",
    phone: "+1 123-456-7898",
    email: "martin.bothman@example.com",
    requestId: "1669297460",
    service: "Men's Haircut",
    date: "17-May, 2025 Wed",
    time: "18:00-18:30",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Gretchen Levin",
    phone: "+1 123-456-7891",
    email: "gretchen.levin@example.com",
    requestId: "1669297453",
    service: "Women's Haircut",
    date: "10-May, 2025 Wed",
    time: "11:00-11:30",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Roger Westervelt",
    phone: "+1 123-456-7896",
    email: "roger.westervelt@example.com",
    requestId: "1669297458",
    service: "Men's Haircut",
    date: "15-May, 2025 Mon",
    time: "16:00-16:30",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Chance Dokidis",
    phone: "+1 123-456-7897",
    email: "chance.dokidis@example.com",
    requestId: "1669297459",
    service: "Men's Haircut",
    date: "16-May, 2025 Tue",
    time: "17:00-17:30",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "Marilyn Lipshutz",
    phone: "+1 123-456-7892",
    email: "marilyn.lipshutz@example.com",
    requestId: "1669297454",
    service: "Women's Haircut, Long Hair",
    date: "11-May, 2025 Thu",
    time: "12:00-12:30",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&q=80",
  },
  {
    name: "James Septimus",
    phone: "+1 123-456-7894",
    email: "james.septimus@example.com",
    requestId: "1669297456",
    service: "Men's Haircut",
    date: "13-May, 2025 Sat",
    time: "14:00-14:30",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1465101053361-7630b8c1dc02?auto=format&fit=facearea&w=256&h=256&q=80",
  },
];

export const HotelRequestCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
      {mockRequests.map((req) => (
        <HotelRequestCard key={req.name} request={req} />
      ))}
    </div>
  );
};
