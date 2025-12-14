type Props = {
  kategoriler: string[];
  secili: string;
  setSecili: (k: string) => void;
};

export default function KategoriFiltre({
  kategoriler,
  secili,
  setSecili,
}: Props) {
  return (
    <div className="flex gap-3 flex-wrap mb-6">
      {["Hepsi", ...kategoriler].map((kat) => (
        <button
          key={kat}
          onClick={() => setSecili(kat)}
          className={`px-4 py-2 rounded-full border transition
            ${
              secili === kat
                ? "bg-indigo-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
        >
          {kat}
        </button>
      ))}
    </div>
  );
}
