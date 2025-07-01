import Image from "next/image";
import Link from "next/link";

import facebookIcon from "@/assets/icons/facebook.png";
import instagramIcon from "@/assets/icons/instagram.png";
import snapchatIcon from "@/assets/icons/snapchat.png";
import tiktokIcon from "@/assets/icons/tiktok.png";
import appStoreLogo from "@/assets/images/app-store.png";
import logo from "@/assets/images/logo-horizontal.png";
import googlePlayLogo from "@/assets/images/play-store.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-accent border-t">
      {/* Main Footer Content */}
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        {/* Logo and store */}
        <div className="space-y-8 lg:col-span-2">
          <Image src={logo} alt="Logo" className="h-10 w-auto mr-3" />
          <div className="flex gap-2">
            <Image src={appStoreLogo} alt="App Store" className="h-11 w-auto" />
            <Image
              src={googlePlayLogo}
              alt="Google Play"
              className="h-11 w-auto"
            />
          </div>
          <p className="text-sm font-semibold">
            Company # 490039-445, Registered with House of companies.
          </p>
        </div>

        {/* Newsletter and social */}
        <div className=" lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              Get Exclusive Deals in your inbox
            </h3>
            <div className="flex rounded-full shadow-lg h-12 bg-white">
              <Input
                type="email"
                placeholder="youremail@gmail.com"
                className="flex-1 border-none shadow-none h-12"
              />
              <Button className="h-full bg-primary rounded-full">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              we won&apos;t spam, read our{" "}
              <Link href="/email-policy" className="underline">
                email policy
              </Link>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-3">
            <Link href="https://www.facebook.com" target="_blank">
              <Image src={facebookIcon} alt="Facebook" className="size-8" />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <Image src={instagramIcon} alt="Instagram" className="size-8" />
            </Link>
            <Link href="https://www.tiktok.com" target="_blank">
              <Image src={tiktokIcon} alt="TikTok" className="size-8" />
            </Link>
            <Link href="https://www.snapchat.com" target="_blank">
              <Image src={snapchatIcon} alt="Snapchat" className="size-8" />
            </Link>
          </div>
        </div>

        {/* Legal Pages */}
        <div>
          <h3 className="font-semibold mb-4">Legal Pages</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/privacy-policy"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy & Policy
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-foreground"
              >
                Cookies
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground"
              >
                Terms and conditions
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-muted-foreground hover:text-foreground"
              >
                Frequently Asked Questions
              </Link>
            </li>
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="font-semibold mb-4">Important Links</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="text-muted-foreground hover:text-foreground"
              >
                Add your restaurant
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="text-muted-foreground hover:text-foreground"
              >
                Sign up to deliver
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="text-muted-foreground hover:text-foreground"
              >
                Add your grocery shop
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Sub footer */}
      <div className="py-3 px-5 border-t bg-primary text-white">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
          <p className="mb-2 sm:mb-0 text-xs">
            Order.uk Copyright {new Date().getFullYear()}, All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-medium">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/pricing" className="hover:underline">
              Pricing
            </Link>
            <Link href="/privacy-policy#donotsell" className="hover:underline">
              Do not sell or share my personal information
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
