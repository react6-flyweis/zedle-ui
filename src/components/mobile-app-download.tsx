/** biome-ignore-all lint/a11y/useValidAnchor: <explanation> */
import Image from "next/image";
import appStoreImage from "@/assets/images/app-store.png";
import playStoreImage from "@/assets/images/play-store.png";
import zedleAppImage from "@/assets/images/zedle-app.png";
import { Button } from "@/components/ui/button";

export function MobileAppDownload() {
  return (
    <section className="py-16 px-4 ">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Download
              <br />
              mobile app
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Imperdiet ex tristique viverra nunc, bibendum orci vel auctor
              cursus tortor non placerat massa. Pellentesque uma ut at sed in.
              Tristis alisuet nusi hendrerit enim consequentum. Consequat mauris
              nasu bibendum. Augue alisuet verius faucibus at integer tristique
              ut. Pellentesque ut nibh sed Incis non malesuada nibh non risus.
              Viveas nibh dignissim congue austor a. Egrlt sapiten tper. quod
              non peded rutrum est ut vel. Curabitur pharetra sed rutrum nunc
              eius est.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="outline"
                className="bg-black text-white hover:bg-gray-800 p-0 h-auto"
                asChild
              >
                <a href="#" className="block">
                  <Image
                    src={appStoreImage}
                    alt="Download on the App Store"
                    className="h-12 w-auto"
                  />
                </a>
              </Button>

              <Button
                variant="outline"
                className="p-0 h-auto border-gray-300"
                asChild
              >
                <a href="#" className="block">
                  <Image
                    src={playStoreImage}
                    alt="Get it on Google Play"
                    className="h-12 w-auto"
                  />
                </a>
              </Button>
            </div>
          </div>

          {/* Right side - App mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src={zedleAppImage}
                alt="Zedle Mobile App"
                className="w-full max-w-sm h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
