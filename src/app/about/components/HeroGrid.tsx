import Image from "next/image";

import aboutBg1 from "../assets/about-bg-1.jpg";
import aboutBg2 from "../assets/about-bg-2.jpg";
import aboutBg3 from "../assets/about-bg-3.jpg";
import aboutBg4 from "../assets/about-bg-4.jpg";
import aboutBg5 from "../assets/about-bg-5.jpg";

export default function HeroGrid() {
  return (
    <div className="flex flex-col justify-end relative h-[75vh] z-0">
      <div className="absolute grid grid-cols-5 h-full w-full top-0 left-0">
        {/* Grid Item 4 */}
        <div className="relative overflow-hidden">
          <Image
            src={aboutBg4}
            alt="Zedle Service 4"
            fill
            className="object-cover"
          />
        </div>

        {/* Grid Item 5 */}
        <div className="relative overflow-hidden">
          <Image
            src={aboutBg5}
            alt="Zedle Service 5"
            fill
            className="object-cover"
          />
        </div>

        {/* Grid Item 3 */}
        <div className="relative overflow-hidden">
          <Image
            src={aboutBg3}
            alt="Zedle Service 3"
            fill
            className="object-cover"
          />
        </div>

        {/* Grid Item 1 */}
        <div className="relative overflow-hidden">
          <Image
            src={aboutBg1}
            alt="Zedle Service 1"
            fill
            className="object-cover"
          />
        </div>

        {/* Grid Item 2 */}
        <div className="relative overflow-hidden">
          <Image
            src={aboutBg2}
            alt="Zedle Service 2"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Zedle Logo Overlay */}
      <div className="z-10 p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Zedle
        </h1>
      </div>

      {/* About Us Text Overlay */}
      <div className="right-0 bg-white/10 backdrop-blur-md p-10">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            About Us
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            Maxwell's Club is an American membership buying club based in
            Jacksonville, Florida, with a rich history in retail that dates back
            to the 1970s. As a small, family-owned company, we pride ourselves
            on providing our members with direct access to a vast selection of
            high-quality products, including home furnishings, electronics,
            outdoor gear, and brand-name clothing and accessories. Our owner, a
            disabled combat Marine veteran, is dedicated to upholding our
            commitment to excellence in customer service and community
            involvement.
          </p>
        </div>
      </div>
    </div>
  );
}
