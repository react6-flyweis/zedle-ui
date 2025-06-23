"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import couponIcon from "@/assets/icons/coupon.png";
import Image from "next/image";

interface CouponSectionProps {
  onApplyCoupon?: (couponCode: string) => void;
}

export default function CouponSection({ 
  onApplyCoupon
}: CouponSectionProps) {
  const [couponCode, setCouponCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApply = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode);
      onApplyCoupon?.(couponCode);
      setIsDialogOpen(false);
      setCouponCode("");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <div className="">
      <div className="border-t pt-4 w-full">
        {appliedCoupon ? (
          // Applied coupon state
          <div className="flex items-center justify-between px-4 py-2 border-2 border-green-300 bg-green-50 rounded">
            <div className="flex items-center gap-2">
              <Image
                src={couponIcon}
                alt="Coupon Icon"
                width={24}
                height={24}
                className="text-green-500"
              />
              <div>
                <p className="font-semibold text-green-700">Coupon Applied</p>
                <p className="text-sm text-green-600">{appliedCoupon}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveCoupon}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              Remove
            </Button>
          </div>
        ) : (
          // Apply coupon button
          <button
            type="button"
            className="w-full flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
            onClick={() => setIsDialogOpen(true)}
          >
            <Image
              src={couponIcon}
              alt="Coupon Icon"
              width={24}
              height={24}
              className="text-gray-500"
            />
            <p className="font-semibold">Apply Coupon</p>
          </button>
        )}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-left">Apply Coupon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="coupon-code"
                className="text-sm text-gray-600 mb-2 block"
              >
                Enter your coupon code
              </label>
              <Input
                id="coupon-code"
                type="text"
                placeholder="Enter here..."
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              onClick={handleApply}
              className="w-full"
              disabled={!couponCode.trim()}
            >
              APPLY
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
