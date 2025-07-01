import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function HeroComponent({
  title,
  subtitle,
  inputTitle,
  characterImage,
  backgroundImage,
}: {
  title: string[];
  subtitle: string;
  inputTitle: string;
  description?: string;
  inputPlaceholder?: string;
  characterImage: string | StaticImageData;
  backgroundImage?: string | StaticImageData;
}) {
  return (
    <section className="relative overflow-hidden h-[60vh]">
      {/* Main Container */}

      {/* Character Image */}
      <div className="absolute left-0 flex flex-col md:flex-row justify-center items-end w-full h-full z-20">
        <Image
          src={characterImage}
          alt="Grocery delivery person"
          className="object-contain max-w-72 -mb-12"
          priority
        />
      </div>

      <div className="flex justify-between items-center h-full">
        {/* Left Content */}
        <div className="flex-1 z-10 p-8">
          <div className="w-2/3">
            {/* Subtitle */}
            <p className="text-gray-800 font-medium">{subtitle}</p>

            {/* Main Title */}
            <h1 className="text-4xl flex flex-col font-bold  leading-tight mb-4">
              {title.map((line, index) => (
                <span
                  key={line}
                  className={cn(
                    index === title.length - 1
                      ? "text-primary"
                      : " text-gray-900",
                  )}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Search Section */}
            <div className="space-y-2">
              <p className="text-gray-600 text-sm">{inputTitle}</p>

              {/* Search Input */}
              <div className="flex rounded-full shadow-lg h-12 bg-white">
                <Input
                  type="email"
                  placeholder="e.g. EC4R 3TE"
                  className="flex-1 border-none shadow-none h-full"
                />
                <Button className="h-full bg-primary rounded-full w-1/3 ">
                  search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Notification Cards */}
        <div className="relative flex-1 flex w-full items-center justify-center h-full">
          <div className="absolute bg-primary w-full h-[95%] right-0 bottom-0 -z-10 rounded-tl-full"></div>
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt="Grocery Hero Background"
              className="absolute left-10 bottom-0 rounded-tl-4xl h-[85%] w-60 -z-10"
              priority
            />
          )}

          <div className="flex flex-col items-end max-w-sm">
            {[
              {
                step: 1,
                title: "We've Received your order! 📋",
                description: "Awaiting Restaurant acceptance",
              },
              {
                step: 2,
                title: "Order Accepted! ✅",
                description: "Your order will be delivered shortly",
              },
              {
                step: 3,
                title: "Your rider's nearby 🚗",
                description: "They're almost there - get ready!",
              },
            ].map(({ step, title, description }) => (
              <div
                key={step}
                className={cn(
                  "w-80 flex flex-col items-end gap-1",
                  step === 1 && "mr-9",
                  step === 3 && "mr-7",
                )}
              >
                {/* Step Number with Outline */}
                <div
                  className="text-4xl font-bold flex-shrink-0 relative"
                  style={
                    {
                      WebkitTextStroke: ".8px white",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    } as React.CSSProperties
                  }
                >
                  {step}
                </div>

                {/* Notification Card */}
                <Card className="flex-1 shadow-xl w-full border-gray-100 gap-0 p-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-3 bg-primary rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Z</span>
                      </div>
                      <span className="font-semibold text-xs text-gray-900">
                        Zedle
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">now</span>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <h3 className="font-semibold text-xs text-gray-900">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-500">{description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
