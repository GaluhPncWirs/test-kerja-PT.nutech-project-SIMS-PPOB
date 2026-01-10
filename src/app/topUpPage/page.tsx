import { useState } from "react";
import Header from "../../components/header/content";
import Input from "../../components/input/content";
import TopUpSaldo from "../../components/topUpSaldo/content";
import { useGetToken } from "../../hooks/useGetToken/getToken";
import ContainerRoot from "../../layout/containerRoot/content";
import { fetchApi } from "../../services/api";
import ModalBox from "../../layout/modalBox/content";
import { Check } from "lucide-react";
import { formatRupiah } from "../../hooks/useFormatRupiah/formatRupiah";
import Loading from "../../components/loading/content";

export default function TopUpPage() {
  const token = useGetToken();
  const [isLoading, setIsLoading] = useState(false);
  const [nominalTopup, setNominalTopup] = useState<any>(null);
  const [nominalTopupClick, setNominalTopupClick] = useState<number | null>(
    null
  );
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleTopupSaldo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valueInput = event.target as HTMLFormElement;

    setNominalTopup(formatRupiah(valueInput.nominal.value));

    try {
      setIsLoading(true);
      const req = await fetchApi("/topup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          top_up_amount: Number(valueInput.nominal.value),
          transaction_type: "TOPUP",
        }),
      });

      const res = await req.json();
      if (res.status === 102) {
        alert(res.message);
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("gagal fetch api", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ContainerRoot>
      <Header />
      <div className="mt-7">
        <h2>Silahkan Masukkan</h2>
        <h1 className="text-2xl font-semibold tracking-wide">Nominal Top Up</h1>
        <div className="flex gap-x-5 items-center mt-7">
          <form onSubmit={(e) => handleTopupSaldo(e)} className="basis-3/5">
            <Input
              placeholder="masukkan nominal Top Up"
              typeInput="number"
              inputId="nominal"
              isError={false}
              valueInput={nominalTopupClick || ""}
            >
              <img src="/images/topUpPage/nominal.png" alt="nominal" />
            </Input>
            <button
              className="bg-[#f5261b] hover:bg-red-500 text-white mt-7 w-full py-3 font-semibold tracking-wide text-lg cursor-pointer"
              type="submit"
            >
              Top Up
            </button>
          </form>
          <div className="basis-2/5 grid grid-cols-3 gap-y-6 gap-x-3">
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

      <ModalBox isOpen={isSuccess} onClose={() => setIsSuccess(false)}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500">
          <Check className="text-white size-7" strokeWidth={3} />
        </div>
        <p className="text-lg text-gray-600 font-semibold">Top Up Sebesar</p>

        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          {nominalTopup}
        </h1>

        <p className="mt-1 text-gray-700 font-medium">berhasil!</p>
      </ModalBox>
      {isLoading && <Loading />}
    </ContainerRoot>
  );
}
