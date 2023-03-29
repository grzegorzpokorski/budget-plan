export const Loader = () => (
  <div
    className="flex flex-col md:flex-row gap-4 items-center justify-center animate-pulse"
    role="status"
  >
    <div className="flex flex-col gap-2 items-center p-6 bg-white rounded shadow w-full md:w-1/3 h-[104px]">
      <div className="h-6 w-36 bg-neutral-200"></div>
      <div className="h-6 w-20 bg-neutral-200"></div>
    </div>
    <div className="flex flex-col gap-2 items-center p-6 bg-white rounded shadow w-full md:w-1/3 h-[104px]">
      <div className="h-6 w-36 bg-neutral-200"></div>
      <div className="h-6 w-20 bg-neutral-200"></div>
    </div>
    <div className="flex flex-col gap-2 items-center p-6 bg-white rounded shadow w-full md:w-1/3 h-[104px]">
      <div className="h-6 w-36 bg-neutral-200"></div>
      <div className="h-6 w-20 bg-neutral-200"></div>
    </div>
  </div>
);
