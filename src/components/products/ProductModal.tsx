type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ProductModal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded w-96">
        {children}

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 px-3 py-1 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}