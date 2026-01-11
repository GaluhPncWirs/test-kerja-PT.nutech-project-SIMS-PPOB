import { Link, useLocation } from "react-router-dom";
import NameProject from "../nameProject/content";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { to: "/Homepage", label: "Home" },
    { to: "/Topup", label: "Top Up" },
    { to: "/Transaksi", label: "Transaksi" },
    { to: "/Akun", label: "Akun" },
  ];
  return (
    <>
      <nav className="border-b-2 border-[#e8e8e8] flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 h-16 sm:h-20 bg-white z-50 fixed top-0 w-full">
        <NameProject />

        <div className="hidden md:flex gap-x-6 lg:gap-x-10 font-semibold text-base lg:text-xl">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-[#f5261b] transition-colors ${
                pathname === link.to ? "text-[#f5261b]" : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="size-6 text-gray-700" />
          ) : (
            <Menu className="size-6 text-gray-700" />
          )}
        </button>
      </nav>

      <div
        className={`md:hidden fixed top-16 sm:top-20 left-0 right-0 bg-white border-b-2 border-[#e8e8e8] shadow-lg transition-all duration-300 ease-in-out z-40 ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col py-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={`px-6 py-4 font-semibold text-lg hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                pathname === link.to
                  ? "text-[#f5261b] bg-red-50"
                  : "text-gray-700"
              } ${index === navLinks.length - 1 ? "border-b-0" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-30 top-16 sm:top-20"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
