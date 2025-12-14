type Props = {
  acik: boolean;
  kapat: () => void;
  baslik: string;
  children: React.ReactNode;
};

export default function Modal({ acik, kapat, baslik, children }: Props) {
  if (!acik) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">{baslik}</h2>

        <button
          onClick={kapat}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
