import {
  CarRentalRequestCard,
  type ICarRentalRequest,
} from "./CarRentalRequestCard";

const mockRequests: ICarRentalRequest[] = [
  {
    name: "Chance Dokidis",
    phone: "+1 123-456-7897",
    email: "chance.dokidis@example.com",
    requestId: "1669297459",
    pickupPoint: "New Jersey Airport",
    date: "16-May, 2025 Tue",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256&q=80",
    dropoffPoint: "",
  },
  {
    name: "Charlie Saris",
    phone: "+1 123-456-7895",
    email: "charlie.saris@example.com",
    requestId: "1669297457",
    pickupPoint: "New Jersey Airport",
    date: "14-May, 2025 Sun",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&w=256&h=256&q=80",
    dropoffPoint: "",
  },
  {
    name: "Martin Ekstrom Bothman",
    phone: "+1 123-456-7898",
    email: "martin.bothman@example.com",
    requestId: "1669297460",
    pickupPoint: "New Jersey Airport",
    date: "17-May, 2025 Wed",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&q=80",
    dropoffPoint: "",
  },
  {
    name: "Roger Westervelt",
    phone: "+1 123-456-7896",
    email: "roger.westervelt@example.com",
    requestId: "1669297458",
    pickupPoint: "New Jersey Airport",
    date: "15-May, 2025 Mon",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&q=80",
    dropoffPoint: "",
  },
  {
    name: "James Septimus",
    phone: "+1 123-456-7894",
    email: "james.septimus@example.com",
    requestId: "1669297456",
    pickupPoint: "New Jersey Airport",
    date: "13-May, 2025 Sat",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&w=256&h=256&q=80",
    dropoffPoint: "",
  },
  {
    name: "Livia Curtis",
    phone: "+1 123-456-7893",
    email: "livia.curtis@example.com",
    requestId: "1669297455",
    pickupPoint: "New Jersey Airport",
    date: "12-May, 2025 Fri",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&q=80",
    dropoffPoint: "",
  },
  {
    name: "Nolan Bator",
    phone: "+1 123-456-7899",
    email: "nolan.bator@example.com",
    requestId: "1669297461",
    pickupPoint: "New Jersey Airport",
    date: "18-May, 2025 Thu",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256&q=80",
    dropoffPoint: "",
  },
  {
    name: "Gretchen Levin",
    phone: "+1 123-456-7891",
    email: "gretchen.levin@example.com",
    requestId: "1669297453",
    pickupPoint: "New Jersey Airport",
    date: "10-May, 2025 Wed",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&q=80",
    dropoffPoint: "",
  },
  {
    name: "Marilyn Lipshutz",
    phone: "+1 123-456-7892",
    email: "marilyn.lipshutz@example.com",
    requestId: "1669297454",
    pickupPoint: "New Jersey Airport",
    date: "11-May, 2025 Thu",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&q=80",
    dropoffPoint: "",
  },
  {
    name: "Chance Septimus",
    phone: "+1 987-654-3210",
    email: "chance.septimus@example.com",
    requestId: "1669297452",
    pickupPoint: "New Jersey Airport",
    date: "09-May, 2025 Tue",
    status: "SP Assigned",
    imageUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&q=80",
    dropoffPoint: "",
  },
];

export const CarRentalRequestGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
      {mockRequests.map((req) => (
        <CarRentalRequestCard key={req.name} request={req} />
      ))}
    </div>
  );
};
