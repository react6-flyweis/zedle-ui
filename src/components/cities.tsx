import { ChevronRight } from "lucide-react";

const cities = [
  { id: "nyc", name: "New York City" },
  { id: "la", name: "Los Angeles" },
  { id: "chi", name: "Chicago" },
  { id: "hou", name: "Houston" },
  { id: "phx", name: "Phoenix" },
  { id: "phi", name: "Philadelphia" },
  { id: "sa", name: "San Antonio" },
  { id: "sd", name: "San Diego" },
  { id: "bos", name: "Boston" },
  { id: "buf", name: "Buffalo" },
  { id: "mia", name: "Miami" },
  { id: "atl", name: "Atlanta" },
  { id: "dal", name: "Dallas" },
  { id: "lv", name: "Las Vegas" },
  { id: "sf", name: "San Francisco" },
  { id: "sea", name: "Seattle" },
  { id: "jax", name: "Jacksonville" },
  { id: "aus", name: "Austin" },
  { id: "mil", name: "Milwaukee" },
  { id: "lr", name: "Little Rock" },
  { id: "dc", name: "Washington, D.C." },
  { id: "nyc2", name: "New York City" },
  { id: "la2", name: "Los Angeles" },
  { id: "chi2", name: "Chicago" },
  { id: "hou2", name: "Houston" },
  { id: "phx2", name: "Phoenix" },
  { id: "phi2", name: "Philadelphia" },
  { id: "sa2", name: "San Antonio" },
];

export function Cities() {
  return (
    <section className="bg-primary py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-3xl font-bold text-center mb-12">
          We are available on this cities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          {cities.map((city) => (
            <div key={city.id} className="flex items-center text-white">
              <ChevronRight className="size-5 mr-2" />
              <span className="text-sm font-medium">{city.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
