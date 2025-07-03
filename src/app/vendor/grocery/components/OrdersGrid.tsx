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
