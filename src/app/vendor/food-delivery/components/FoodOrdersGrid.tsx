import { FoodOrderCard, type IFoodOrder } from "./FoodOrderCard";

const mockOrders: IFoodOrder[] = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1600891963935-c9b6b6e1b1d5?auto=format&fit=crop&w=400&q=80",
    name: "Pizza Calzone European",
    price: 164,
    unit: '14"',
    quantity: 2,
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
    name: "Mexican Burger",
    price: 40,
    unit: "Medium",
    quantity: 1,
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1600891963935-c9b6b6e1b1d5?auto=format&fit=crop&w=400&q=80",
    name: "Pizza Calzone European",
    price: 164,
    unit: '14"',
    quantity: 2,
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1600891963935-c9b6b6e1b1d5?auto=format&fit=crop&w=400&q=80",
    name: "Pizza Calzone European",
    price: 164,
    unit: '14"',
    quantity: 2,
  },
  {
    id: "5",
    imageUrl:
      "https://images.unsplash.com/photo-1600891963935-c9b6b6e1b1d5?auto=format&fit=crop&w=400&q=80",
    name: "Pizza Calzone European",
    price: 164,
    unit: '14"',
    quantity: 2,
  },
  {
    id: "6",
    imageUrl:
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80",
    name: "Margherita Pizza",
    price: 147,
    unit: '16"',
    quantity: 1,
  },
  {
    id: "7",
    imageUrl:
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80",
    name: "Margherita Pizza",
    price: 147,
    unit: '16"',
    quantity: 1,
  },
  {
    id: "8",
    imageUrl:
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80",
    name: "Margherita Pizza",
    price: 147,
    unit: '16"',
    quantity: 1,
  },
];

export function FoodOrdersGrid() {
  return (
    <div className="p-8 w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockOrders.map((order) => (
          <FoodOrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
