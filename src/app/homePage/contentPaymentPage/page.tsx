import { useParams } from "react-router-dom";
import { Check, Wallet } from "lucide-react";
import { useState } from "react";
import { useGetToken } from "../../../hooks/useGetToken/getToken";
import { useGetService } from "../../../hooks/useGetService/getService";
import { fetchApi } from "../../../services/api";
import { formatRupiah } from "../../../hooks/useFormatRupiah/formatRupiah";
import ModalBox from "../../../layout/modalBox/content";
import Loading from "../../../components/loading/content";

type serviceDataType = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
};

export default function PaymentPage() {
  const token = useGetToken();
  const { service } = useParams();
  const { services, loading } = useGetService();

  const serviceData: serviceDataType = services.find(
    (item: any) => item.service_code === service
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmTransaction, setConfirmTransaction] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  function handleTransaction() {
    setPendingData({
      service_code: serviceData?.service_code,
      transaction_type: "PAYMENT",
    });
    setConfirmTransaction(true);
  }

  async function handleConfirmTransaction() {
    if (!pendingData) return;

    try {
      setIsLoading(true);
      setConfirmTransaction(false);

      const req = await fetchApi("/transaction", {
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
    setConfirmTransaction(false);
    setPendingData(null);
  }

  return (
    <div className="mt-7">
      <h2 className="text-xl tracking-wide">Pembayaran</h2>
      <div className="flex gap-x-3 items-center mt-3">
        <img src={serviceData?.service_icon} alt="Listrik" className="size-8" />
        <h3 className="font-semibold tracking-wide text-lg">
          {serviceData?.service_name}
        </h3>
      </div>
      <div className="mt-10">
        <div className="relative">
          <div className="py-5 flex pr-4 border border-[#e8e8e8] placeholder:text-[#e8e8e8] w-full">
            <span className="pl-14">
              {formatRupiah(serviceData?.service_tariff)}
            </span>
            <div className="absolute left-3.5 size-6">
              <img src="/images/globalImg/pembayaran.png" alt="pembayaran" />
            </div>
          </div>
        </div>

        <ModalBox isOpen={confirmTransaction}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5261b]">
            <Wallet className="text-white size-7" strokeWidth={3} />
          </div>
          <p className="text-lg text-gray-600 font-semibold">
            {`Beli ${serviceData?.service_name} senilai`}
          </p>

          <h1 className="mt-3 text-2xl font-bold text-gray-900">
            {formatRupiah(serviceData?.service_tariff) || "Rp.0"} ?
          </h1>

          <div className="mt-5 flex flex-col gap-y-3 items-center text-lg font-semibold">
            <button
              onClick={handleConfirmTransaction}
              className="text-[#f5261b]"
            >
              lanjutkan Bayar
            </button>
            <button onClick={handleCancelTopup} className="text-slate-500">
              Batalkan
            </button>
          </div>
        </ModalBox>

        <ModalBox isOpen={isSuccess}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500">
            <Check className="text-white size-7" strokeWidth={3} />
          </div>
          <p className="text-lg text-gray-600 font-semibold">{`Pembayaran ${serviceData?.service_name} Sebesar`}</p>

          <h1 className="mt-3 text-2xl font-bold text-gray-900">
            {formatRupiah(serviceData?.service_tariff)}
          </h1>

          <p className="mt-1 text-gray-700 font-medium">berhasil!</p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-5 text-lg font-semibold text-[#f5261b]"
          >
            Kembali ke Beranda
          </button>
        </ModalBox>
        <button
          className="bg-[#f5261b] text-[#e8e8e8] mt-5 w-full py-3 font-semibold tracking-wide text-lg"
          onClick={handleTransaction}
        >
          Bayar
        </button>
      </div>
      {isLoading || (loading && <Loading />)}
    </div>
  );
}
