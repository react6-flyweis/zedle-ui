// Import category images

import chipsBeveragesImg from "./assets/chips-bevarages.png";
import dairyImg from "./assets/dairy.png";
import homeCareImg from "./assets/home-care.png";
import vegetableFruitsImg from "./assets/vegetable-fruits.png";

import CategoryCard from "./components/CategoryCard";
import GroceryCard from "./components/GroceryCard";

const categories = [
  {
    id: 1,
    title: "Vegetables & Fruits",
    image: vegetableFruitsImg,
    bgColor: "bg-green-50",
    textColor: "text-green-800",
  },
  {
    id: 2,
    title: "Chips & Beverages",
    image: chipsBeveragesImg,
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
  },
  {
    id: 3,
    title: "Dairy products",
    image: dairyImg,
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
  },
  {
    id: 4,
    title: "Home Care",
    image: homeCareImg,
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
  },
];

const hotDeals = [
  {
    id: 1,
    name: "Indian Tomato (Desi Tomato)",
    weight: "500 g",
    currentPrice: 40,
    originalPrice: 65,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1546470427-e013cb2d8a9e?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Beetroot",
    weight: "500 g",
    currentPrice: 90,
    originalPrice: 115,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Cauliflower",
    weight: "300 g",
    currentPrice: 80,
    originalPrice: 95,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1568584711271-946d1d4d4896?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Carrot",
    weight: "500 g",
    currentPrice: 40,
    originalPrice: 65,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Cabbage",
    weight: "500 g",
    currentPrice: 90,
    originalPrice: 115,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Purple Cabbage",
    weight: "300 g",
    currentPrice: 80,
    originalPrice: 95,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1518616127844-5a4b51252cd2?w=400&h=300&fit=crop",
  },
];

export default function GroceryPage() {
  return (
    <div className="py-10 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-left my-5">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Our Categories
        </h2>
        <p className="text-lg text-gray-600">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
            bgColor={category.bgColor}
            textColor={category.textColor}
          />
        ))}
      </div>

      {/* Hot Deals Section */}
      <div>
        {/* Header Section */}
        <div className="text-left my-5">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hot Deals</h2>
          <p className="text-lg text-gray-600">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        {/* Hot Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotDeals.map((product) => (
            <GroceryCard
              key={product.id}
              id={product.id}
              name={product.name}
              weight={product.weight}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              discount={product.discount}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
