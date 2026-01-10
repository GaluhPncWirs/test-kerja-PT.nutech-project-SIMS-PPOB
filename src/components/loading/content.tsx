export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
      <span className="animate-spin size-10 border-4 border-[#f5261b] border-t-transparent border-b-transparent rounded-full" />
    </div>
  );
}
