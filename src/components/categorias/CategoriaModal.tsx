type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function CategoriaModal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded w-96 max-h-[90vh] overflow-y-auto">
        {children}

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 px-3 py-1 rounded text-white"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
