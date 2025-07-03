import { GroceryOrderCard, type IGroceryOrder } from "./GroceryOrderCard";

const mockOrders: IGroceryOrder[] = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    name: "Itambe Natural Milk",
    price: 80,
    unit: "1 L",
    quantity: 2,
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80",
    name: "Fresh Tomato",
    price: 30,
    unit: "1 Kg",
    quantity: 1,
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    name: "Fresh Carrot",
    price: 40,
    unit: "1 Kg",
    quantity: 1,
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    name: "Sweet Potato",
    price: 20,
    unit: "1 Kg",
    quantity: 1,
  },
  {
    id: "5",
    imageUrl:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    name: "Organic Broccoli",
    price: 60,
    unit: "500 g",
    quantity: 3,
  },
  {
    id: "6",
    imageUrl:
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80",
    name: "Red Apple",
    price: 50,
    unit: "1 Kg",
    quantity: 2,
  },
  {
    id: "7",
    imageUrl:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    name: "Banana",
    price: 25,
    unit: "1 Dozen",
    quantity: 1,
  },
  {
    id: "8",
    imageUrl:
      "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80",
    name: "Brown Eggs",
    price: 70,
    unit: "12 pcs",
    quantity: 1,
  },
];

export function OrdersGrid() {
  return (
    <div className="p-8 w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockOrders.map((order) => (
          <GroceryOrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
