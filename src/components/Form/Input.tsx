import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
};

export default function Input({
  label,
  error,
  className = "",
  ...rest
}: Props) {
  return (
    <label className="block">
      {label ? (
        <div className="mb-1 text-sm text-gray-text/80">{label}</div>
      ) : null}
      <input
        className={`w-full rounded-xl bg-white px-3 py-2 text-gray-text placeholder:text-gray-text/40 ring-1 ring-brown/12 focus-ring ${className}`}
        {...rest}
      />
      {error ? <div className="mt-1 text-sm text-rose-700">{error}</div> : null}
    </label>
  );
}
