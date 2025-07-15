import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { ServiceCard } from "@/components/ServiceCard";
import { Input } from "@/components/ui/input";

const mockServices = [
  {
    id: 1,
    title: "Women's hair-cut long hair",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    price: "$ 23.10",
    imageUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Women's haircut",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    price: "$ 23.10",
    imageUrl:
      "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Men's haircut",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    price: "$ 23.10",
    imageUrl:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    title: "Women's hair-cut long hair",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    price: "$ 23.10",
    imageUrl:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    title: "Women's haircut",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    price: "$ 23.10",
    imageUrl:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop",
  },
  {
    id: 6,
    title: "Men's haircut",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    price: "$ 23.10",
    imageUrl:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop",
  },
];

export function ServicesSection() {
  const t = useTranslations("servicesSection");
  return (
    <div className="px-6 py-8 mt-5 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <h3 className="text-xl font-semibold">{t("searchTitle")}</h3>
        {/* Search Bar */}
        <div className="relative w-60">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={t("searchPlaceholder")}
            className="pl-10 bg-transparent  rounded-full h-12"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold my-6">{t("servicesTitle")}</h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockServices.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            imageUrl={service.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
