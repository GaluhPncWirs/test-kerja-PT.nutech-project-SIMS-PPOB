import { Link } from "react-router-dom";
import { useGetService } from "../../../hooks/useGetService/getService";

const promoMenarik: any = [
  {
    srcImg: "/images/homePage/Banner 1.png",
    altImg: "Banner 1",
  },
  {
    srcImg: "/images/homePage/Banner 2.png",
    altImg: "Banner 2",
  },
  {
    srcImg: "/images/homePage/Banner 3.png",
    altImg: "Banner 3",
  },
  {
    srcImg: "/images/homePage/Banner 4.png",
    altImg: "Banner 4",
  },
  {
    srcImg: "/images/homePage/Banner 5.png",
    altImg: "Banner 5",
  },
];

export default function Home() {
  const { services, loading } = useGetService();

  return (
    <>
      {loading ? (
        <div className="mt-5 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 px-4 md:px-0 animate-pulse">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-center flex-col">
              <div className="size-12 sm:size-14 md:size-16 rounded-lg bg-gray-200" />
              <div className="mt-2 h-2 sm:h-3 w-12 sm:w-14 md:w-16 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 px-4 md:px-0">
          {services.map((item: any, i: number) => (
            <Link
              to={`Pembayaran/${item.service_code}`}
              key={i}
              className="flex items-center flex-col hover:opacity-80 transition-opacity"
            >
              <img
                src={item.service_icon}
                alt="services"
                className="size-12 sm:size-14 md:size-16 rounded-lg"
                loading="eager"
              />
              <h1 className="w-full text-center mt-2 text-[10px] sm:text-xs leading-tight px-1">
                {item.service_name}
              </h1>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 md:mt-10 px-4 md:px-0">
        <h1 className="font-semibold text-lg sm:text-xl tracking-wide">
          Temukan promo menarik
        </h1>
        <div className="flex items-center gap-x-4 sm:gap-x-5 md:gap-x-7 overflow-x-auto mt-4 md:mt-5 pb-3 scrollbar-hide">
          {promoMenarik.map((item: any, i: number) => (
            <img
              key={i}
              src={item.srcImg}
              alt={item.altImg}
              className="h-32 sm:h-40 md:h-48 lg:h-auto min-w-50 sm:min-w-62.5 md:min-w-75 rounded-lg object-cover shrink-0"
              loading="eager"
            />
          ))}
        </div>
      </div>
    </>
  );
}
