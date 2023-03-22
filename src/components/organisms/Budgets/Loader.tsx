export const Loader = () => (
  <div role="status" className="animate-pulse">
    <div className="bg-white h-4 w-36 my-3 mx-auto md:mx-0 rounded"></div>
    <div className="list-none flex flex-col gap-4 bg-white divide-y-2 p-6 pt-2 shadow rounded">
      <Item />
      <Item />
    </div>
  </div>
);

const Item = () => (
  <div className="flex flex-row gap-4 pt-4">
    <div className="flex flex-col gap-2 pt-4 w-full">
      <div className="flex flex-row justify-between">
        <div className="h-6 w-28 md:w-40 bg-neutral-200"></div>
        <div className="h-6 w-24 bg-neutral-200"></div>
      </div>
      <div className="my-2 w-full h-4 w-full bg-neutral-200"></div>
    </div>
    <div className="flex flex-col md:flex-row gap-2 ml-auto my-auto">
      <div className="h-8 w-8 bg-neutral-200 rounded"></div>
    </div>
  </div>
);
