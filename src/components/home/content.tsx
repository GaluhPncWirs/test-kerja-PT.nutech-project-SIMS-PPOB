import { useEffect, useState } from "react";
import { useGetToken } from "../../hooks/useGetToken/getToken";
import { Link } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const token = useGetToken();

  useEffect(() => {
    async function getDataUser() {
      try {
        const req = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/services",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const res = await req.json();
        if (res) {
          setServices(res.data);
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
        <div className="mt-5 flex justify-around flex-wrap gap-y-4 animate-pulse">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-lg flex items-center flex-col">
              <div className="size-16 rounded-lg bg-gray-200" />

              <div className="mt-2 h-3 w-16 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 flex justify-around">
          {services.map((item: any, i: number) => (
            <Link
              to={`Pembayaran/${item.service_code}`}
              key={i}
              className="rounded-lg flex items-center flex-col"
            >
              <img src={item.service_icon} alt="services" className="size-16" />
              <h1 className="max-w-20 text-center mt-2 text-xs leading-tight">
                {item.service_name}
              </h1>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        <h1 className="font-semibold text-xl tracking-wide">
          Temukan promo menarik
        </h1>
        <div className="flex items-center gap-x-7 overflow-auto mt-5 pb-3">
          {promoMenarik.map((item: any, i: number) => (
            <img key={i} src={item.srcImg} alt={item.altImg} />
          ))}
        </div>
      </div>
    </>
  );
}
