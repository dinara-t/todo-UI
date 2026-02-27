import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md";
};

const base =
  "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition shadow-sm ring-1 ring-brown/10 focus-ring disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary: "bg-orange text-white hover:brightness-95",
  secondary:
    "bg-gray-input text-gray-text hover:bg-gray-input/70 shadow-none ring-brown/15",
  danger: "bg-rose-600 text-white hover:bg-rose-500 ring-rose-700/20",
};

const sizes: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-9",
  md: "h-10",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: Props) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    />
  );
}
