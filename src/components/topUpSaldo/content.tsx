export default function TopUpSaldo({
  nominalStr,
  nominalNum,
  clickNominal,
}: {
  nominalStr: string;
  nominalNum: number;
  clickNominal: any;
}) {
  return (
    <button
      className="border-2 border-[#e8e8e8] px-5 py-3 cursor-pointer"
      onClick={() => clickNominal(nominalNum)}
    >
      {nominalStr}
    </button>
  );
}
