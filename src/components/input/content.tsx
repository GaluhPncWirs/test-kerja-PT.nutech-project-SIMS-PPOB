import type React from "react";

type inputProps = {
  children: React.ReactNode;
  placeholder: string;
  typeInput: string;
  inputId: string;
  isError: boolean;
  valueInput: string | number;
};

export default function Input(props: inputProps) {
  const {
    typeInput,
    placeholder,
    children,
    inputId = "",
    isError = false,
    valueInput,
  } = props;
  return (
    <div className="relative flex items-center">
      <input
        type={typeInput}
        className={`pl-12 py-2.5 pr-4 border border-[#e8e8e8] placeholder:text-[#e8e8e8] w-full ${
          isError && `border-[#f5261b]`
        }`}
        placeholder={placeholder}
        id={inputId}
        defaultValue={valueInput}
      />
      <div
        className={`absolute left-3.5 size-5 text-[#e8e8e8] ${
          isError && `text-[#f5261b]`
        }`}
      >
        {children}
      </div>
    </div>
  );
}
