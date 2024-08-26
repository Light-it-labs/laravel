import { useState } from "react";
import { ChevronRightIcon } from "~/components/icons/ChevronRightIcon";
import { FreestyleLogo } from "~/components/logos/FreestyleLogo";
import { twMerge as tw } from "tailwind-merge";

interface PharmacyPromotion {
  id: number;
  pharmacyName: string;
  price: string;
  bin: string;
  productName: string;
}

const pharmacyPromotions: PharmacyPromotion[] = [
  {
    id: 1,
    pharmacyName: "CVS Caremark",
    price: "$200",
    bin: "123456",
    productName: "Freestyle Libre 3",
  },
  {
    id: 2,
    pharmacyName: "OptumRx",
    price: "$230",
    bin: "123456",
    productName: "Freestyle Libre 3",
  },
  {
    id: 3,
    pharmacyName: "Express Scripts",
    price: "$267",
    bin: "123456",
    productName: "Freestyle Libre 3",
  },
  {
    id: 4,
    pharmacyName: "Walgreens",
    price: "$308",
    bin: "123456",
    productName: "Freestyle Libre 3",
  },
];

export const PharmacyBenefit = () => {
  const [selectedPromotion, setSelectedPromotion] = useState<PharmacyPromotion>(
    {
      id: 1,
      pharmacyName: "CVS Caremark",
      price: "$200",
      bin: "123456",
      productName: "Freestyle Libre 3",
    },
  );

  const { price, pharmacyName, productName, bin } = selectedPromotion;
  return (
    <div className="mx-auto flex w-3/4 flex-col gap-12">
      <div className="flex flex-col gap-12 text-center">
        <h1 className="text-3xl  text-[#07284A]">
          Your <b>Freestyle Libre CGM System</b> classifies as a Pharmacy
          benefit.
        </h1>
        <p className="text-[#07284A]">
          You can pick it up at any of the following pharmacies:
        </p>
      </div>
      <div className="flex justify-center gap-8">
        <div className="flex w-1/3 flex-col gap-4">
          {pharmacyPromotions.map((promotion) => {
            const { id, pharmacyName, price } = promotion;
            return (
              <button
                key={id}
                className={tw(
                  "flex w-full justify-between rounded-md border border-[#F0F7FF] px-4 py-8 shadow-md hover:border-[#bed4ee] hover:bg-[#bed4ee]",
                  selectedPromotion?.id === id
                    ? "border-[#bed4ee] bg-[#bed4ee]"
                    : "border-[#F0F7FF]",
                )}
                onClick={() => setSelectedPromotion(promotion)}
              >
                <p>{pharmacyName}</p>
                <div className="flex gap-2">
                  <p>{price}</p>
                  <ChevronRightIcon />
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex w-1/3 flex-col items-center gap-8 rounded-lg border  ">
          <div className="flex w-full justify-center rounded-t-lg rounded-bl-3xl bg-[#bed4ee] p-8 ">
            <FreestyleLogo />
          </div>
          <div className="flex w-2/3 flex-col items-center gap-12 text-center ">
            <div className="flex flex-col gap-2">
              <p className="text-4xl font-bold text-[#0B406F]">{price}</p>
              <p className="text-[#6B7280]">{productName}</p>
            </div>
            <p className="text-[#051E38] ">
              Show this coupon at the
              <b>{pharmacyName}</b> Pharmacy.
            </p>
            <div className="flex  w-full justify-between text-[#6B7280]">
              <p>BIN</p>
              <p>{bin}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
