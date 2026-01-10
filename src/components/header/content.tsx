import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetToken } from "../../hooks/useGetToken/getToken";

type dataUser = {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
};

export default function Header() {
  const [dataUser, setDataUser] = useState<dataUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  // const [isTokenExpired, setIsTokenExpired] = useState(false);
  const token = useGetToken();
  const [hideBalance, setHideBalance] = useState(false);

  useEffect(() => {
    async function getDataUser() {
      try {
        setIsLoading(true);
        const [dataUser, balance] = await Promise.all([
          fetch("https://take-home-test-api.nutech-integrasi.com/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          fetch("https://take-home-test-api.nutech-integrasi.com/balance", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        const responDataUser = await dataUser.json();
        const responBalance = await balance.json();

        if (!responBalance || !responDataUser) {
          alert("Token tidak tidak valid atau kadaluwarsa");
        } else {
          setDataUser(responDataUser.data);
          setBalance(responBalance.data.balance);
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
        <div className="flex items-center gap-x-3 h-40 animate-pulse">
          <div className="basis-1/2 h-full px-7 flex flex-col gap-y-4">
            <div className="size-14 rounded-full bg-gray-200" />

            <div className="flex flex-col gap-y-2">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-6 w-48 rounded bg-gray-200" />
            </div>
          </div>

          <div className="basis-2/3 h-full px-7 py-5 rounded-lg bg-gray-200 flex flex-col gap-y-3">
            <div className="h-5 w-32 rounded bg-gray-300" />

            <div className="flex items-end gap-x-2">
              <div className="h-6 w-10 rounded bg-gray-300" />
              <div className="h-10 w-40 rounded bg-gray-300" />
            </div>

            <div className="h-4 w-28 rounded bg-gray-300" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-x-3 h-40">
          <div className="basis-1/2 h-full px-7 flex flex-col gap-y-4">
            <img
              src="/images/globalImg/Profile Photo.png"
              alt="Profile"
              className="size-14"
              loading="eager"
            />
            <div>
              <h4 className="text-lg tracking-wide">Selamat datang,</h4>
              <h1 className="text-3xl tracking-wide font-semibold">
                {dataUser?.first_name} {dataUser?.last_name}
              </h1>
            </div>
          </div>
          <div className="bgSaldo basis-2/3 h-full px-7 py-5 text-[#e8e8e8] flex flex-col gap-y-2">
            <h3 className="font-semibold text-xl">Saldo anda</h3>
            <h1 className="font-bold flex gap-x-2">
              <span className="text-3xl">Rp</span>
              {hideBalance ? (
                <span className="text-4xl">{balance}</span>
              ) : (
                <span className="text-4xl tracking-widest">•••••••</span>
              )}
            </h1>
            <h4 className="font-medium flex gap-x-2 items-center">
              <span>Lihat Saldo</span>
              <button className="cursor-pointer">
                {hideBalance ? (
                  <Eye
                    className="size-5"
                    onClick={() => setHideBalance(!hideBalance)}
                  />
                ) : (
                  <EyeClosed
                    className="size-5"
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
