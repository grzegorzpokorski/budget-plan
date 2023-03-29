export const Loader = () => (
  <div
    className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse"
    role="status"
  >
    <div className="flex flex-col gap-2 items-center p-6 bg-white rounded shadow">
      <div className="h-6 w-36 bg-neutral-200"></div>
      <div className="h-6 w-20 bg-neutral-200"></div>
    </div>
    <div className="flex flex-col gap-2 items-center p-6 bg-white rounded shadow">
      <div className="h-6 w-36 bg-neutral-200"></div>
      <div className="h-6 w-20 bg-neutral-200"></div>
    </div>
    <div className="col-span-2 md:col-span-1 flex flex-col gap-2 items-center p-6 bg-white rounded shadow">
      <div className="h-6 w-36 bg-neutral-200"></div>
      <div className="h-6 w-20 bg-neutral-200"></div>
    </div>
  </div>
);
