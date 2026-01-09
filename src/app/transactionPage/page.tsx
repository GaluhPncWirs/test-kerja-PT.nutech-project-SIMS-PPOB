import { MinusIcon, PlusIcon } from "lucide-react";
import Header from "../../components/header/content";
import ContainerRoot from "../../layout/containerRoot/content";

export default function TransactionPage() {
  return (
    <ContainerRoot>
      <Header />
      <div className="mt-7">
        <h1 className="tracking-wide font-semibold text-xl">Semua Transaksi</h1>
        <div className="mt-5 grid grid-cols-1 gap-y-7">
          <div className="border-2 border-[#e8e8e8] py-3 px-7">
            <div className="flex justify-between items-center mb-2.5">
              <div className="text-[#65a892] flex gap-x-3 items-center">
                <PlusIcon className="size-6" />
                <h3 className="text-xl font-semibold tracking-wider">
                  Rp.10.000
                </h3>
              </div>
              <h3>desc Transaksi</h3>
            </div>
            <h4 className="text-slate-400 tracking-wide">
              07 agustus 2023 jam
            </h4>
          </div>
          <div className="border-2 border-[#e8e8e8] py-3 px-7">
            <div className="flex justify-between items-center mb-2.5">
              <div className="text-[#f5261b] flex gap-x-3 items-center">
                <MinusIcon className="size-6" />
                <h3 className="text-xl font-semibold tracking-wider">
                  Rp.40.000
                </h3>
              </div>
              <h3>desc Transaksi</h3>
            </div>
            <h4 className="text-slate-400 tracking-wide">
              07 agustus 2023 jam
            </h4>
          </div>
        </div>
        <button className="text-[#f5261b] font-semibold tracking-wide mt-5 text-lg text-center w-full">
          Show more
        </button>
      </div>
    </ContainerRoot>
  );
}
