import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetToken } from "../../hooks/useGetToken/getToken";
import { fetchApi } from "../../services/api";
import { useGetDataUser } from "../../hooks/useGetUserData/getUserData";

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  // const [isTokenExpired, setIsTokenExpired] = useState(false);
  const token = useGetToken();
  const [hideBalance, setHideBalance] = useState(false);
  const dataUser = useGetDataUser();

  useEffect(() => {
    async function getDataUser() {
      try {
        setIsLoading(true);
        const req = await fetchApi("/balance", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const res = await req.json();

        if (!res) {
          alert("Token tidak tidak valid atau kadaluwarsa");
        } else {
          setBalance(res.data.balance);
        }
      } catch (error) {
        console.error("gagal fetch api", error);
      } finally {
        setIsLoading(false);
      }
    }
    getDataUser();
  }, [token]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-x-3 min-h-40 p-4 md:p-0 animate-pulse">
          <div className="md:basis-1/2 h-auto md:h-40 px-4 md:px-7 py-4 md:py-0 flex flex-col justify-center gap-y-3 md:gap-y-4 bg-white md:bg-transparent rounded-lg md:rounded-none">
            <div className="size-12 sm:size-14 rounded-full bg-gray-200" />

            <div className="flex flex-col gap-y-2">
              <div className="h-3 sm:h-4 w-24 sm:w-32 rounded bg-gray-200" />
              <div className="h-5 sm:h-6 w-36 sm:w-48 rounded bg-gray-200" />
            </div>
          </div>

          <div className="md:basis-2/3 h-auto md:h-40 px-4 sm:px-6 md:px-7 py-4 md:py-5 rounded-lg bg-gray-200 flex flex-col justify-center gap-y-2 md:gap-y-3">
            <div className="h-4 sm:h-5 w-24 sm:w-32 rounded bg-gray-300" />

            <div className="flex items-end gap-x-2 flex-wrap">
              <div className="h-5 sm:h-6 w-8 sm:w-10 rounded bg-gray-300" />
              <div className="h-7 sm:h-8 md:h-10 w-32 sm:w-36 md:w-40 rounded bg-gray-300" />
            </div>

            <div className="h-3 sm:h-4 w-20 sm:w-28 rounded bg-gray-300" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-x-3 min-h-40 p-4 md:p-0">
          <div className="md:basis-1/2 h-auto md:h-40 px-4 md:px-7 py-4 md:py-0 flex flex-col justify-center gap-y-3 md:gap-y-4 bg-white md:bg-transparent rounded-lg md:rounded-none">
            <img
              src={dataUser?.profile_image}
              alt="Profile"
              className="size-12 sm:size-14 rounded-full"
              loading="eager"
            />
            <div>
              <h4 className="text-sm sm:text-base md:text-lg tracking-wide">
                Selamat datang,
              </h4>
              <h1 className="text-xl sm:text-2xl md:text-3xl tracking-wide font-semibold wrap-break-words">
                {dataUser?.first_name} {dataUser?.last_name}
              </h1>
            </div>
          </div>

          <div className="bgSaldo md:basis-2/3 h-auto md:h-36 px-4 sm:px-6 md:px-7 py-4 md:py-5 text-[#e8e8e8] flex flex-col justify-center gap-y-2 rounded-lg">
            <h3 className="font-semibold text-base sm:text-lg md:text-xl">
              Saldo anda
            </h3>
            <h1 className="font-bold flex gap-x-2 items-baseline flex-wrap">
              <span className="text-2xl sm:text-3xl">Rp</span>
              {hideBalance ? (
                <span className="text-2xl sm:text-3xl md:text-4xl break-all">
                  {balance}
                </span>
              ) : (
                <span className="text-2xl sm:text-3xl md:text-4xl tracking-widest">
                  •••••••
                </span>
              )}
            </h1>
            <h4 className="font-medium flex gap-x-2 items-center text-sm sm:text-base">
              <span>Lihat Saldo</span>
              <button className="cursor-pointer hover:opacity-80 transition-opacity">
                {hideBalance ? (
                  <Eye
                    className="size-4 sm:size-5"
                    onClick={() => setHideBalance(!hideBalance)}
                  />
                ) : (
                  <EyeClosed
                    className="size-4 sm:size-5"
                    onClick={() => setHideBalance(!hideBalance)}
                  />
                )}
              </button>
            </h4>
          </div>
        </div>
      )}
    </>
  );
}
