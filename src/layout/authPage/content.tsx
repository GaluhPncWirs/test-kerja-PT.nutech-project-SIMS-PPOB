import type React from "react";
import { Link } from "react-router-dom";

type authPageLayoutProps = {
  authTitle: string;
  children: React.ReactNode;
  titleBtnAction: string;
  callAction: string;
  href: string;
};

export default function AuthPageLayout(props: authPageLayoutProps) {
  const { authTitle, children, titleBtnAction, callAction, href } = props;
  return (
    <div className="w-4xl mx-auto h-screen flex justify-between items-center">
      <div className="basis-md flex flex-col items-center gap-y-5">
        <div className="flex gap-x-3 items-center justify-center">
          <img src="/images/globalImg/Logo.png" alt="Logo" className="size-9" />
          <h2 className="text-xl font-semibold">
            SIMS PPOB galuh panca wirasa
          </h2>
        </div>
        <h1 className="text-2xl font-semibold text-center max-w-xs leading-tight">
          {authTitle}
        </h1>
        <div className="flex flex-col gap-y-6 w-10/12">{children}</div>
        <button className="bg-[#f5261b] text-[#e8e8e8] tracking-wider font-semibold text-xl w-10/12 py-2.5 rounded-md">
          {titleBtnAction}
        </button>

        <h3>
          {callAction}{" "}
          <Link
            to={href}
            className="text-[#f5261b] font-bold hover:underline cursor-pointer"
          >
            di sini
          </Link>
        </h3>
      </div>
      <img src="/images/loginPage/Illustrasi Login.png" className="w-md" />
    </div>
  );
}
