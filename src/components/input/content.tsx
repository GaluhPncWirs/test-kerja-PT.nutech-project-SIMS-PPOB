import type React from "react";

type inputProps = {
  children: React.ReactNode;
  placeholder: string;
  typeInput: string;
};

export default function Input(props: inputProps) {
  const { typeInput, placeholder, children } = props;
  return (
    <div className="relative flex items-center">
      <input
        type={typeInput}
        className="pl-12 py-2.5 pr-4 border border-[#e8e8e8] placeholder:text-[#e8e8e8] w-full"
        placeholder={placeholder}
      />
      <div className="absolute left-3.5 size-6">{children}</div>
    </div>
  );
}
