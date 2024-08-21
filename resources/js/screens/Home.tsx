export const Home = () => {
  return (
    <div className="flex w-1/3 flex-col gap-12 self-center">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-[#D54115]">
          FreeStyle Libre 3 system
        </h3>
        <h1 className="text-6xl text-[#07284A]">
          Designed with <b>you</b> in mind
        </h1>

        <p className="text-[#051E38]">
          The world&lsquo;s smallest sensor streams readings directly to your
          smartphone* so you can know your glucose levels with just a quick
          glance.
        </p>
      </div>
      <button className="w-2/3 rounded-md bg-[#0B406F] px-8 py-2 text-white">
        Get started
      </button>
    </div>
  );
};
