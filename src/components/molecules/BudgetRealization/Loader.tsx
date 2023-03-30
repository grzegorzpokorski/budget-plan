export const Loader = () => (
  <div
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse"
    role="status"
  >
    <div className="col-span-2 sm:col-span-1 flex flex-row sm:flex-col flex-wrap justify-between gap-2 items-center p-6 bg-white rounded shadow">
      <div className="h-6 w-36 bg-neutral-200"></div>
      <div className="h-6 w-20 bg-neutral-200"></div>
    </div>
    <div className="col-span-2 sm:col-span-1 flex flex-row sm:flex-col flex-wrap justify-between gap-2 items-center p-6 bg-white rounded shadow">
      <div className="h-6 w-36 bg-neutral-200"></div>
      <div className="h-6 w-20 bg-neutral-200"></div>
    </div>
    <div className="col-span-2 sm:col-span-2 md:col-span-1 flex flex-row sm:flex-col flex-wrap justify-between gap-2 items-center p-6 bg-white rounded shadow">
      <div className="h-6 w-36 bg-neutral-200"></div>
      <div className="h-6 w-20 bg-neutral-200"></div>
    </div>
  </div>
);
