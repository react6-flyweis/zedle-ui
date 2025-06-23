"use client";

import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

interface CouponSectionProps {
  onApplyCoupon: () => void;
}

export default function CouponSection({ onApplyCoupon }: CouponSectionProps) {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300">
        <Tag className="w-5 h-5 text-gray-500" />
        <Button
          variant="ghost"
          size="sm"
          onClick={onApplyCoupon}
          className="text-teal-600 hover:text-teal-700"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
