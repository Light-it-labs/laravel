export const Button = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center">
      <button
        className="rounded-full bg-red-600 px-16 py-2 text-white shadow-lg"
        type="submit"
      >
        {text}
      </button>
    </div>
  );
};
