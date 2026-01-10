import { MinusIcon, PlusIcon } from "lucide-react";
import Header from "../../components/header/content";
import ContainerRoot from "../../layout/containerRoot/content";
import { useEffect, useMemo, useState } from "react";
import { fetchApi } from "../../services/api";
import { useGetToken } from "../../hooks/useGetToken/getToken";
import { formatRupiah } from "../../hooks/useFormatRupiah/formatRupiah";
import { formatDate } from "../../hooks/useformatDate/formatDate";

export default function TransactionPage() {
  const [historyTransaksi, setHistoryTransaksi] = useState<any>(null);
  const token = useGetToken();
  const [showAll, setShowAll] = useState(false);

  const sortedData = useMemo(() => {
    const records = historyTransaksi?.records ?? [];

    return [...records].sort(
      (a, b) =>
        new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
    );
  }, [historyTransaksi]);

  const visibleData = showAll
    ? sortedData
    : sortedData.slice(0, historyTransaksi?.limit ?? 3);

  useEffect(() => {
    async function handleTransaction() {
      const req = await fetchApi("/transaction/history", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const res = await req.json();
      if (res) {
        setHistoryTransaksi(res.data);
      }
    }

    handleTransaction();
  }, [token]);

  return (
    <ContainerRoot>
      <Header />
      <div className="mt-7">
        <h1 className="tracking-wide font-semibold text-xl">Semua Transaksi</h1>

        <div className="mt-5 grid grid-cols-1 gap-y-7">
          {visibleData.map((trx) => (
            <div
              key={trx.invoice_number}
              className="border-2 border-[#e8e8e8] py-3 px-7"
            >
              <div className="flex justify-between items-center mb-2.5">
                <div
                  className={`flex gap-x-3 items-center ${
                    trx.transaction_type === "PAYMENT"
                      ? "text-[#f5261b]"
                      : "text-emerald-500"
                  }`}
                >
                  {trx.transaction_type === "PAYMENT" ? (
                    <MinusIcon className="size-6" />
                  ) : (
                    <PlusIcon className="size-6" />
                  )}

                  <h3 className="text-xl font-semibold tracking-wider">
                    {formatRupiah(trx.total_amount)}
                  </h3>
                </div>

                <h3 className="text-sm font-medium">{trx.description}</h3>
              </div>

              <h4 className="text-slate-400 tracking-wide text-sm">
                {formatDate(trx.created_on)}
              </h4>
            </div>
          ))}
        </div>

        {!showAll && sortedData.length > historyTransaksi?.limit && (
          <button
            onClick={() => setShowAll(true)}
            className="text-[#f5261b] font-semibold tracking-wide mt-5 text-lg text-center w-full"
          >
            Show more
          </button>
        )}
      </div>
    </ContainerRoot>
  );
}
