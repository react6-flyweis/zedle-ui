"use client";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { OfferCard } from "@/components/OfferCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockBurgers = [
  {
    title: "Classic Burger",
    description: "A classic beef burger with lettuce, tomato, and cheese.",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Cheeseburger",
    description: "A beef burger topped with melted cheese and pickles.",
    price: 9.49,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Bacon Burger",
    description: "A beef burger loaded with crispy bacon and BBQ sauce.",
    price: 10.49,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
  },
];

const offerCategories = [
  { value: "offers", label: "Offers" },
  { value: "burgers", label: "Burgers" },
  { value: "fries", label: "Fries" },
  { value: "snacks", label: "Snacks" },
  { value: "salads", label: "Salads" },
  { value: "coldDrinks", label: "Cold drinks" },
  { value: "happyMeal", label: "Happy Meal" },
  { value: "desserts", label: "Desserts" },
  { value: "hotDrinks", label: "Hot drinks" },
  { value: "sauces", label: "Sauces" },
];

export function OffersSection() {
  const t = useTranslations("offers");

  // Tab content components
  function BurgersTab() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBurgers.map((item) => (
          <OfferCard
            key={item.title}
            title={item.title}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    );
  }

  function PlaceholderTab({ label }: { label: string }) {
    return (
      <div className="text-muted-foreground">
        No {label.toLowerCase()} available.
      </div>
    );
  }

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        {t("allOffersFrom", { restaurant: "McDonald's New York" })}
      </h2>
      <Tabs defaultValue="offers" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-10">
          <TabsList className="w-full whitespace-nowrap rounded-full bg-transparent p-1 flex gap-2 overflow-x-scroll">
            {offerCategories.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="px-4 py-2 rounded-full text-base font-medium data-[state=active]:bg-gray-800 data-[state=active]:text-white"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="w-80 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="w-5 h-5" />
            </span>
            <Input
              type="search"
              className="rounded-full pl-10"
              placeholder={t("searchPlaceholder")}
            />
          </div>
        </div>
        <TabsContent value="offers">
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-4">Burgers</h3>
              <BurgersTab />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Fries</h3>
              <PlaceholderTab label="Fries" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Snacks</h3>
              <PlaceholderTab label="Snacks" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Salads</h3>
              <PlaceholderTab label="Salads" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Cold drinks</h3>
              <PlaceholderTab label="Cold drinks" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Happy Meal</h3>
              <PlaceholderTab label="Happy Meal" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Desserts</h3>
              <PlaceholderTab label="Desserts" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Hot drinks</h3>
              <PlaceholderTab label="Hot drinks" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Sauces</h3>
              <PlaceholderTab label="Sauces" />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="burgers">
          <h3 className="text-xl font-semibold mb-4">Burgers</h3>
          <BurgersTab />
        </TabsContent>
        <TabsContent value="fries">
          <h3 className="text-xl font-semibold mb-4">Fries</h3>
          <PlaceholderTab label="Fries" />
        </TabsContent>
        <TabsContent value="snacks">
          <h3 className="text-xl font-semibold mb-4">Snacks</h3>
          <PlaceholderTab label="Snacks" />
        </TabsContent>
        <TabsContent value="salads">
          <h3 className="text-xl font-semibold mb-4">Salads</h3>
          <PlaceholderTab label="Salads" />
        </TabsContent>
        <TabsContent value="coldDrinks">
          <h3 className="text-xl font-semibold mb-4">Cold drinks</h3>
          <PlaceholderTab label="Cold drinks" />
        </TabsContent>
        <TabsContent value="happyMeal">
          <h3 className="text-xl font-semibold mb-4">Happy Meal</h3>
          <PlaceholderTab label="Happy Meal" />
        </TabsContent>
        <TabsContent value="desserts">
          <h3 className="text-xl font-semibold mb-4">Desserts</h3>
          <PlaceholderTab label="Desserts" />
        </TabsContent>
        <TabsContent value="hotDrinks">
          <h3 className="text-xl font-semibold mb-4">Hot drinks</h3>
          <PlaceholderTab label="Hot drinks" />
        </TabsContent>
        <TabsContent value="sauces">
          <h3 className="text-xl font-semibold mb-4">Sauces</h3>
          <PlaceholderTab label="Sauces" />
        </TabsContent>
      </Tabs>
    </section>
  );
}
