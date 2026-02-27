import { useEffect } from "react";
import Button from "../Button/Button";

type Props = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
};

export default function Modal({
  open,
  title,
  children,
  onClose,
  footer,
}: Props) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl ring-1 ring-brown/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-text">{title}</h2>
            <div className="mt-1 text-sm text-gray-text/60">
              Press Esc to close
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            aria-label="Close"
          >
            Close
          </Button>
        </div>
        <div className="mt-4 text-gray-text">{children}</div>
        {footer ? (
          <div className="mt-5 flex justify-end gap-2">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
