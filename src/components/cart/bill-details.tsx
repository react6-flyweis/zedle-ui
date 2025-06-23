"use client";

interface BillDetailsProps {
  itemTotal: number;
  deliveryFee: number;
  extraDiscount: number;
  totalAmount: number;
  savings: number;
}

export default function BillDetails({
  itemTotal,
  deliveryFee,
  extraDiscount,
  totalAmount,
  savings,
}: BillDetailsProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg">Bill details</h3>

      <div className="flex justify-between">
        <span>Item Total</span>
        <span className="font-medium">${itemTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery Fee | 2.8 kms</span>
        <span className="font-medium">${deliveryFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Extra discount for you</span>
        <span className="font-medium">${extraDiscount.toFixed(2)}</span>
      </div>

      <div className="flex justify-between border-y py-2">
        <span className="text-gray-600">Delivery tip</span>
        <span className="font-medium text-primary">Add tip</span>
      </div>

      <div className="pt-3">
        <div className="flex justify-between text-lg font-semibold">
          <span>TO PAY</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {savings > 0 && (
        <div className="bg-teal-50 border-teal-500 border p-3 mt-4">
          <p className="text-teal-700 font-medium">
            Savings of ${savings.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
