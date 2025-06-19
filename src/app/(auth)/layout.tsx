import { AuthCarousel } from "@/components/auth-carousel";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[90vh] grid md:grid-cols-2 lg:grid-cols-5">
      {/* Left side - Image and promotional content */}
      <div className="relative lg:col-span-2">
        <AuthCarousel />
      </div>

      {/* Right side - Auth forms */}
      <div className="lg:col-span-3 w-full flex items-center justify-center p-8">
        <div className="w-full max-w-xl">{children}</div>
      </div>
    </div>
  );
}
