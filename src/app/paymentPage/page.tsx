import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetToken } from "../../hooks/useGetToken/getToken";
import { fetchApi } from "../../services/api";

export default function PaymentPage() {
  const { pathname } = useLocation();
  const token = useGetToken();

  const manipulateString = pathname.split("/").slice(-1).join("");

  useEffect(() => {
    async function handleTransaction() {
      const req = await fetchApi("/transaction", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_code: manipulateString,
        }),
      });

      const res = await req.json();
      console.log(res);
    }

    handleTransaction();
  }, [token, manipulateString]);

  return (
    <div className="mt-7">
      <h2 className="text-xl tracking-wide">Pembayaran</h2>
      <div className="flex gap-x-3 items-center mt-3">
        <img
          src="/images/homePage/Listrik.png"
          alt="Listrik"
          className="size-8"
        />
        <h3 className="font-semibold tracking-wide text-lg">
          Listrik Prabayar
        </h3>
      </div>
      <div className="mt-10">
        <div className="relative">
          <div className="py-5 flex pr-4 border border-[#e8e8e8] placeholder:text-[#e8e8e8] w-full">
            <span className="pl-14">Rp.10.000</span>
            <div className="absolute left-3.5 size-6">
              <img src="/images/globalImg/pembayaran.png" alt="pembayaran" />
            </div>
          </div>
        </div>
        <button className="bg-[#f5261b] text-[#e8e8e8] mt-5 w-full py-3 font-semibold tracking-wide text-lg">
          Bayar
        </button>
      </div>
    </div>
  );
}
