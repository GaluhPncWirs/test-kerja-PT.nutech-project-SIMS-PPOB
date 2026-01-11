import { useState } from "react";
import Header from "../../components/header/content";
import TopUpSaldo from "../../components/topUpSaldo/content";
import { useGetToken } from "../../hooks/useGetToken/getToken";
import ContainerRoot from "../../layout/containerRoot/content";
import { fetchApi } from "../../services/api";
import ModalBox from "../../layout/modalBox/content";
import { Check, Wallet } from "lucide-react";
import { formatRupiah } from "../../hooks/useFormatRupiah/formatRupiah";
import Loading from "../../components/loading/content";

export default function TopUpPage() {
  const token = useGetToken();
  const [nominalTopupClick, setNominalTopupClick] = useState<number | null>(
    null
  );
  const [nominalTopupInput, setNominalTopupInput] = useState<number | null>(
    null
  );

  const nominalFinal = nominalTopupClick ?? nominalTopupInput;
  const isNominalValid = Boolean(nominalFinal && nominalFinal > 0);

  const [isLoading, setIsLoading] = useState(false);
  const [nominalTopup, setNominalTopup] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmTopUp, setConfirmTopUp] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  function handleTopupSaldo() {
    setPendingData({
      top_up_amount: nominalTopupInput,
      transaction_type: "TOPUP",
    });

    setNominalTopup(formatRupiah(nominalTopupInput ?? 0));
    setConfirmTopUp(true);
  }

  async function handleConfirmTopup() {
    if (!pendingData) return;

    try {
      setIsLoading(true);
      setConfirmTopUp(false);

      const req = await fetchApi("/topup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pendingData),
      });

      const res = await req.json();

      if (res.status === 102) {
        alert(res.message);
      } else {
        setIsSuccess(true);
        setPendingData(null);
      }
    } catch (error) {
      console.error("gagal fetch api", error);
      alert("Terjadi kesalahan saat top up");
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancelTopup() {
    setConfirmTopUp(false);
    setPendingData(null);
  }

  return (
    <ContainerRoot>
      <div className="pt-5 sm:pt-7 md:pt-20">
        <Header />

        <div className="mt-7 px-4 md:px-0">
          <h2 className="text-sm sm:text-base">Silahkan Masukkan</h2>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">
            Nominal Top Up
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-x-10 items-stretch lg:items-center mt-5 sm:mt-7">
            <div className="flex flex-col w-full lg:w-1/2">
              <div className="relative flex items-center">
                <input
                  type="number"
                  className="pl-10 sm:pl-12 py-2.5 pr-4 border border-[#e8e8e8] placeholder:text-[#e8e8e8] w-full rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#f5261b] focus:border-transparent"
                  placeholder="masukkan nominal Top Up"
                  defaultValue={nominalTopupClick || ""}
                  onChange={(e) => setNominalTopupInput(Number(e.target.value))}
                />
                <div className="absolute left-3 sm:left-3.5 size-4 sm:size-5 text-[#e8e8e8]">
                  <img src="/images/topUpPage/nominal.png" alt="nominal" />
                </div>
              </div>
              <button
                className="bg-[#f5261b] hover:bg-red-500 active:bg-red-600 text-white mt-5 sm:mt-7 w-full py-2.5 sm:py-3 font-semibold tracking-wide text-base sm:text-lg disabled:bg-slate-300 disabled:cursor-not-allowed rounded-md transition-colors"
                type="submit"
                disabled={!isNominalValid}
                onClick={handleTopupSaldo}
              >
                Top Up
              </button>
            </div>

            <div className="w-full lg:basis-2/5 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-y-6 sm:gap-x-3">
              <TopUpSaldo
                nominalStr="Rp.10.000"
                nominalNum={10000}
                clickNominal={setNominalTopupClick}
              />
              <TopUpSaldo
                nominalStr="Rp.20.000"
                nominalNum={20000}
                clickNominal={setNominalTopupClick}
              />
              <TopUpSaldo
                nominalStr="Rp.50.000"
                nominalNum={50000}
                clickNominal={setNominalTopupClick}
              />
              <TopUpSaldo
                nominalStr="Rp.100.000"
                nominalNum={100000}
                clickNominal={setNominalTopupClick}
              />
              <TopUpSaldo
                nominalStr="Rp.250.000"
                nominalNum={250000}
                clickNominal={setNominalTopupClick}
              />
              <TopUpSaldo
                nominalStr="Rp.500.000"
                nominalNum={500000}
                clickNominal={setNominalTopupClick}
              />
            </div>
          </div>
        </div>

        <ModalBox isOpen={confirmTopUp}>
          <div className="px-4 sm:px-6 py-2">
            <div className="mx-auto mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#f5261b]">
              <Wallet className="text-white size-6 sm:size-7" strokeWidth={3} />
            </div>
            <p className="text-base sm:text-lg text-gray-600 font-semibold text-center">
              Anda yakin ingin Top Up sebesar
            </p>

            <h1 className="mt-3 text-xl sm:text-2xl font-bold text-gray-900 text-center">
              {nominalTopup}
            </h1>

            <div className="mt-5 flex flex-col gap-y-3 items-center text-base sm:text-lg font-semibold">
              <button
                onClick={handleConfirmTopup}
                className="text-[#f5261b] hover:underline w-full sm:w-auto py-2"
              >
                Ya lanjutkan Top Up
              </button>
              <button
                onClick={handleCancelTopup}
                className="text-slate-500 hover:underline w-full sm:w-auto py-2"
              >
                Batalkan
              </button>
            </div>
          </div>
        </ModalBox>

        <ModalBox isOpen={isSuccess}>
          <div className="px-4 sm:px-6 py-2">
            <div className="mx-auto mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-emerald-500">
              <Check className="text-white size-6 sm:size-7" strokeWidth={3} />
            </div>
            <p className="text-base sm:text-lg text-gray-600 font-semibold text-center">
              Top Up Sebesar
            </p>

            <h1 className="mt-3 text-xl sm:text-2xl font-bold text-gray-900 text-center">
              {nominalTopup}
            </h1>

            <p className="mt-1 text-gray-700 font-medium text-center">
              berhasil!
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-5 text-base sm:text-lg font-semibold text-[#f5261b] hover:underline w-full sm:w-auto py-2"
            >
              Kembali ke Beranda
            </button>
          </div>
        </ModalBox>
        {isLoading && <Loading />}
      </div>
    </ContainerRoot>
  );
}
