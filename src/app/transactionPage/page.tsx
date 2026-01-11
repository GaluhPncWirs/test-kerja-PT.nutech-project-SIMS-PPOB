import { MinusIcon, PlusIcon } from "lucide-react";
import Header from "../../components/header/content";
import ContainerRoot from "../../layout/containerRoot/content";
import { useEffect, useMemo, useState } from "react";
import { fetchApi } from "../../services/api";
import { useGetToken } from "../../hooks/useGetToken/getToken";
import { formatRupiah } from "../../hooks/useFormatRupiah/formatRupiah";
import { formatDate } from "../../hooks/useformatDate/formatDate";
import Loading from "../../components/loading/content";

type transaksiType = {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
};

type HistoryResponse = {
  offset: number;
  limit: number;
  records: transaksiType[];
};

export default function TransactionPage() {
  const [allRecords, setAllRecords] = useState<transaksiType[]>([]);
  const [historyTransaksi, setHistoryTransaksi] =
    useState<HistoryResponse | null>(null);
  const token = useGetToken();
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const limit = 5;

  async function fetchTransaksi(offset: number) {
    setIsLoading(true);
    try {
      const response = await fetchApi(
        `/transaction/history?offset=${offset}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setHistoryTransaksi(data.data);

      if (offset === 0) {
        setAllRecords(data.data.records);
      } else {
        setAllRecords((prev) => [...prev, ...data.data.records]);
      }

      setHasMore(data.data.records.length === limit);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTransaksi(0);
  }, [token]);

  const sortedData = useMemo(() => {
    return [...allRecords].sort(
      (a, b) =>
        new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
    );
  }, [allRecords]);

  const handleShowMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchTransaksi(newOffset);
  };

  return (
    <ContainerRoot>
      <Header />
      <div className="mt-5 sm:mt-7 px-4 md:px-0">
        <h1 className="tracking-wide font-semibold text-lg sm:text-xl">
          Semua Transaksi
        </h1>

        <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-y-4 sm:gap-y-5 md:gap-y-7">
          {sortedData.map((trx) => (
            <div
              key={trx.invoice_number}
              className="border-2 border-[#e8e8e8] py-3 sm:py-3.5 px-4 sm:px-6 md:px-7 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-2 sm:mb-2.5">
                <div
                  className={`flex gap-x-2 sm:gap-x-3 items-center ${
                    trx.transaction_type === "PAYMENT"
                      ? "text-[#f5261b]"
                      : "text-emerald-500"
                  }`}
                >
                  {trx.transaction_type === "PAYMENT" ? (
                    <MinusIcon className="size-5 sm:size-6 flex-0" />
                  ) : (
                    <PlusIcon className="size-5 sm:size-6 flex-0" />
                  )}

                  <h3 className="text-lg sm:text-xl font-semibold tracking-wider break-all">
                    {formatRupiah(trx.total_amount)}
                  </h3>
                </div>

                <h3 className="text-xs sm:text-sm font-medium text-gray-700 sm:text-right">
                  {trx.description}
                </h3>
              </div>

              <h4 className="text-slate-400 tracking-wide text-xs sm:text-sm">
                {formatDate(trx.created_on)}
              </h4>
            </div>
          ))}
        </div>

        {isLoading && <Loading />}

        {!isLoading && hasMore && (
          <button
            onClick={handleShowMore}
            className="text-[#f5261b] font-semibold tracking-wide mt-4 sm:mt-5 text-base sm:text-lg text-center w-full hover:underline active:text-red-600 py-2 transition-colors"
          >
            Show more
          </button>
        )}

        {!isLoading && !hasMore && sortedData.length > 0 && (
          <p className="text-center mt-4 sm:mt-5 text-gray-500 text-xs sm:text-sm">
            Tidak ada transaksi lainnya
          </p>
        )}

        {!isLoading && sortedData.length === 0 && (
          <div className="text-center mt-8 sm:mt-10 py-8 sm:py-12">
            <p className="text-gray-500 text-sm sm:text-base">
              Belum ada transaksi
            </p>
          </div>
        )}
      </div>
    </ContainerRoot>
  );
}
