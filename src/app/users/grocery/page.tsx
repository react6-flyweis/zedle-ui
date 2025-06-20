// Import category images
import vegetableFruitsImg from "./assets/vegetable-fruits.png";
import chipsBeveragesImg from "./assets/chips-bevarages.png";
import dairyImg from "./assets/dairy.png";
import homeCareImg from "./assets/home-care.png";

import CategoryCard from "./components/CategoryCard";

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
    </div>
  );
}
