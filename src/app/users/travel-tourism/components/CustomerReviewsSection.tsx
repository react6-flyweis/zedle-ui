import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Review = {
  _id: string;
  name: string;
  location: string;
  date: string;
  avatar: string;
  rating: number;
  review: string;
};

const reviews: Review[] = [
  {
    _id: "1",
    name: "St Glx",
    location: "South London",
    date: "24th September, 2023",
    avatar: "/avatars/01.png",
    rating: 5,
    review:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
  },
  {
    _id: "2",
    name: "St Glx",
    location: "South London",
    date: "24th September, 2023",
    avatar: "/avatars/01.png",
    rating: 5,
    review:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
  },
  {
    _id: "3",
    name: "St Glx",
    location: "South London",
    date: "24th September, 2023",
    avatar: "/avatars/01.png",
    rating: 5,
    review:
      "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
  },
];

export function CustomerReviewsSection() {
  return (
    <section className="bg-muted px-8 py-28">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      <div className="flex items-center justify-end gap-2 mb-4">
        <Button
          size="icon"
          className="rounded-full bg-primary/80 text-white hover:bg-primary"
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-primary/80 text-white hover:bg-primary"
        >
          <ChevronRight size={24} />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card
            key={review._id}
            className="border-none rounded shadow-none p-0"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="border-r-2 pr-2 border-yellow-500">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.avatar} alt={review.name} />
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-sm text-yellow-500 font-medium leading-tight">
                      {review.location}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center text-xs  gap-1 mb-1">
                    <Clock size={18} className="text-yellow-500 mr-1" />
                    <span className="text-[#222] font-medium">
                      {review.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={`${review._id}-star-${i}`}
                        size={18}
                        className="text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-sm">{review.review}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
