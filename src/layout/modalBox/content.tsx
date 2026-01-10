type modalBox = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ModalBox({ isOpen, onClose, children }: modalBox) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white w-90 rounded-xl shadow-lg px-6 py-8 text-center">
        {children}
        <button
          onClick={onClose}
          className="mt-6 text-lg font-semibold text-[#f5261b]"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
