import { useTranslations } from "next-intl";
import { GuideCard } from "../components/GuideCard";

const guides = [
  {
    name: "Ahmad Stanton",
    email: "example@gmail.com",
    phone: "+1 778 9874 369",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&facepad=2",
  },
  {
    name: "Livia Bergson",
    email: "example@gmail.com",
    phone: "+1 778 9874 369",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=400&facepad=2",
  },
  {
    name: "Alena Kenter",
    email: "example@gmail.com",
    phone: "+1 778 9874 369",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400&facepad=2",
  },
  {
    name: "Jocelyn Bergson",
    email: "example@gmail.com",
    phone: "+1 778 9874 369",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&h=400&facepad=2",
  },
  {
    name: "Randy Botosh",
    email: "example@gmail.com",
    phone: "+1 778 9874 369",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=400&facepad=2",
  },
  {
    name: "Jaylon Baptista",
    email: "example@gmail.com",
    phone: "+1 778 9874 369",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&w=400&h=400&facepad=2",
  },
  {
    name: "Chance Franci",
    email: "example@gmail.com",
    phone: "+1 778 9874 369",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=400&h=400&facepad=2",
  },
  {
    name: "Gustavo Lubin",
    email: "example@gmail.com",
    phone: "+1 778 9874 369",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=400&facepad=2",
  },
];

export default function GuidePage() {
  const t = useTranslations("guide");
  return (
    <div className="p-8">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
        <p className="text-gray-600">{t("description")}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {guides.map((guide) => (
          <GuideCard key={guide.name} {...guide} />
        ))}
      </div>
    </div>
  );
}
