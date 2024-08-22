// const pharmacies = [
//   {
//     id: 1,
//     name: "CVS Caremark",
//     price: "$200",
//     BIN: "123456",
//     system: "Freestyle Libre 3",
//   },
//   {
//     id: 2,
//     name: "OptumRx",
//     price: "$230",
//     BIN: "123456",
//     system: "Freestyle Libre 3",
//   },
//   {
//     id: 3,
//     name: "Express Scripts",
//     price: "$267",
//     BIN: "123456",
//     system: "Freestyle Libre 3",
//   },
//   {
//     id: 4,
//     name: "Walgreens",
//     price: "$308",
//     BIN: "123456",
//     system: "Freestyle Libre 3",
//   },
// ];

export const PharmacyBenefit = () => {
  return (
    <div className="m-auto flex w-3/4 flex-col gap-12">
      <div className="flex flex-col gap-12 text-center">
        <h1 className="text-3xl  text-[#07284A]">
          Your <b>Freestyle Libre CGM System</b> classifies as a Pharmacy
          benefit.
        </h1>
        <p className="text-[#07284A]">
          You can pick it up at any of the following pharmacies:
        </p>
      </div>
    </div>
  );
};
