export const Loader = () => (
  <div
    className="pt-1 pb-4 px-6 bg-white rounded shadow animate-pulse"
    role="status"
  >
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-1 pt-4 w-full">
        <div className="flex flex-row justify-between">
          <div className="h-6 w-40 bg-neutral-200"></div>
          <div className="h-6 w-24 bg-neutral-200"></div>
        </div>
        <div className="my-2 w-full h-4 w-full bg-neutral-200"></div>
      </div>
    </div>
  </div>
);
