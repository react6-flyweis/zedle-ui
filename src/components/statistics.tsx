import { Card } from "@/components/ui/card";

export function Statistics() {
  const stats = [
    {
      number: "546+",
      label: "Registered Riders",
    },
    {
      number: "789,900+",
      label: "Orders Delivered",
    },
    {
      number: "690+",
      label: "Restaurants Partnered",
    },
    {
      number: "17,457+",
      label: "Food Items",
    },
  ];

  return (
    <section className="py-5 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 bg-transparent border-r-1 rounded-none shadow-none text-center p-5 gap-2"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white/90 font-medium text-sm md:text-base">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
