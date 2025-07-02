import Footer from "@/components/footer";
import Header from "@/components/header";
import { AuthCarousel } from "./components/auth-carousel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header centeredNavigation />
      <main>
        <div className="min-h-[85vh] grid md:grid-cols-2 lg:grid-cols-5">
          {/* Left side - Image and promotional content */}
          <div className="relative lg:col-span-2">
            <AuthCarousel />
          </div>

          {/* Right side - Auth forms */}
          <div className="lg:col-span-3 w-full flex items-center justify-center p-8">
            <div className="w-full max-w-xl">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
