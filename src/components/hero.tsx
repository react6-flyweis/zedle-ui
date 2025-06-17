import { Button } from "@/components/ui/button";
import deliveryBackgroundImage from "@/assets/images/delivery-bg.jpg";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden z-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${deliveryBackgroundImage.src})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-4xl">
              Delivering Trust, <br className="hidden sm:block" />
              On Time – Every <br className="hidden sm:block" />
              Time.
            </h1>
            <p className="mt-6 text-lg text-white/90 md:text-xl">
              Lorem Ipsum Is Simply Dummy Text Of The{" "}
              <br className="hidden sm:block" />
              Printing And Typesetting Industry.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-3 text-base"
              >
                BOOK NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
