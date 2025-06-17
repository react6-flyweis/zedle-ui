import Image from "next/image";

interface CategoryCardProps {
  title: string;
  image: string;
  description?: string;
}

const CategoryCard = ({ title, image }: CategoryCardProps) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100 aspect-video flex flex-col justify-center">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />
      <div className="absolute bottom-4 text-white w-full">
        <h3 className="text-xl font-bold text-center">{title}</h3>
      </div>
    </div>
  );
};

export function Categories() {
  const categories = [
    {
      title: "Logistics",
      image:
        "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&h=450&fit=crop&crop=center",
      description: "Efficient delivery solutions",
    },
    {
      title: "Food Delivery",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop&crop=center",
      description: "Fresh meals at your doorstep",
    },
    {
      title: "Grocery Delivery",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop&crop=center",
      description: "Fresh groceries delivered",
    },
    {
      title: "Travel & Tourism",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=450&fit=crop&crop=center",
      description: "Explore new destinations",
    },
    {
      title: "Enterprise Hub",
      image:
        "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=450&fit=crop&crop=center",
      description: "Business solutions",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Our categories
        </h2>
        <p className="text-muted-foreground text-lg">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First row - 3 cards */}
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            image={category.image}
            description={category.description}
          />
        ))}
      </div>
    </section>
  );
}
