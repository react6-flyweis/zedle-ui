import { ChevronRight } from "lucide-react";

const cities = [
  "New York City",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Boston",
  "Buffalo",
  "Miami",
  "Atlanta",
  "Dallas",
  "Las Vegas",
  "San Francisco",
  "Seattle",
  "Jacksonville",
  "Austin",
  "Milwaukee",
  "Little Rock",
  "Washington, D.C.",
  "New York City",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
];

export function Cities() {
  return (
    <section className="bg-primary py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-3xl font-bold text-center mb-12">
          We are available on this cities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          {cities.map((city, index) => (
            <div key={index} className="flex items-center text-white">
              <ChevronRight className="size-5 mr-2" />
              <span className="text-sm font-medium">{city}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
