import Header from "../../components/header/content";
import ContainerRoot from "../../layout/containerRoot/content";

const pembayaran: any = [
  {
    srcImg: "/images/homePage/PBB.png",
    altImg: "PBB",
    titleContent: "PBB",
  },
  {
    srcImg: "/images/homePage/Listrik.png",
    altImg: "Listrik",
    titleContent: "Listrik",
  },
  {
    srcImg: "/images/homePage/Pulsa.png",
    altImg: "Pulsa",
    titleContent: "Pulsa",
  },
  {
    srcImg: "/images/homePage/PDAM.png",
    altImg: "PDAM",
    titleContent: "PDAM",
  },
  {
    srcImg: "/images/homePage/PGN.png",
    altImg: "PGN",
    titleContent: "PGN",
  },
  {
    srcImg: "/images/homePage/Televisi.png",
    altImg: "Televisi",
    titleContent: "TV Langganan",
  },
  {
    srcImg: "/images/homePage/Musik.png",
    altImg: "Musik",
    titleContent: "Musik",
  },
  {
    srcImg: "/images/homePage/Game.png",
    altImg: "Game",
    titleContent: "Voucher Game",
  },
  {
    srcImg: "/images/homePage/Voucher Makanan.png",
    altImg: "Voucher Makanan",
    titleContent: "Voucher Makanan",
  },
  {
    srcImg: "/images/homePage/Kurban.png",
    altImg: "Kurban",
    titleContent: "Kurban",
  },
  {
    srcImg: "/images/homePage/Zakat.png",
    altImg: "Zakat",
    titleContent: "Zakat",
  },
  {
    srcImg: "/images/homePage/Paket Data.png",
    altImg: "Paket Data",
    titleContent: "Paket Data",
  },
];

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

export default function HomePage() {
  return (
    <ContainerRoot>
      <Header />
      <div className="mt-5 flex justify-around">
        {pembayaran.map((item: any, i: number) => (
          <div key={i} className={`rounded-lg flex items-center flex-col`}>
            <img src={item.srcImg} alt={item.altImg} className="size-16" />
            <h1 className="max-w-20 text-center mt-2 text-sm leading-tight">
              {item.titleContent}
            </h1>
          </div>
        ))}
      </div>

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
    </ContainerRoot>
  );
}
