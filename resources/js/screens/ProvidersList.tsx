const providers = [
  {
    id: 1,
    name: "Quest Health Solutions",
    email: "info@questhealthsolutions.com",
    phoneNumber: "877-270-7050",
  },
  {
    id: 2,
    name: "Quest Health Solutions",
    email: "info@questhealthsolutions.com",
    phoneNumber: "877-270-7050",
  },
  {
    id: 3,
    name: "Quest Health Solutions",
    email: "info@questhealthsolutions.com",
    phoneNumber: "877-270-7050",
  },
  {
    id: 4,
    name: "Quest Health Solutions",
    email: "info@questhealthsolutions.com",
    phoneNumber: "877-270-7050",
  },
  {
    id: 5,
    name: "Quest Health Solutions",
    email: "info@questhealthsolutions.com",
    phoneNumber: "877-270-7050",
  },
  {
    id: 6,
    name: "Quest Health Solutions",
    email: "info@questhealthsolutions.com",
    phoneNumber: "877-270-7050",
  },
  {
    id: 7,
    name: "Quest Health Solutions",
    email: "info@questhealthsolutions.com",
    phoneNumber: "877-270-7050",
  },
  {
    id: 8,
    name: "Quest Health Solutions",
    email: "info@questhealthsolutions.com",
    phoneNumber: "877-270-7050",
  },
];

interface ProviderType {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

const ProviderCard = ({ name, email, phoneNumber }: ProviderType) => {
  return (
    <div className="w-[30%] rounded-lg border border-[#F0F7FF] text-center shadow ">
      <div className="bg-[#F0F7FF] p-4 font-bold text-[#07284A]">
        <h1>{name}</h1>
      </div>
      <div className="flex flex-col gap-2 p-4 text-[#6B7280] ">
        <p>{email}</p>
        <p>{phoneNumber}</p>
      </div>
    </div>
  );
};

export const ProvidersList = () => {
  return (
    <div className="mx-auto flex w-11/12 flex-col gap-12">
      <div className="flex flex-col gap-12 text-center">
        <h1 className="text-3xl  text-[#07284A]">
          Your <b>Freestyle Libre CGM System</b> is covered by your Medical
          Benefit.
        </h1>
        <p className="text-[#07284A]">
          Great news! Here is a list of Durable Medical Equipment (DME)
          providers you can contact to get your device.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {providers.map((provider) => {
          return <ProviderCard key={provider.id} {...provider} />;
        })}
      </div>
    </div>
  );
};
