export const Loader = () => (
  <div className="flex flex-col divide-y-2 rounded animate-pulse" role="status">
    <Item time />
    <Item />
    <Item time />
    <Item />
    <Item time />
  </div>
);

const Item = ({ time }: { time?: boolean }) => (
  <li className="flex flex-col items-center md:items-start justify-start w-full">
    {time && <Time />}
    <article className="flex flex-row items-start justify-start gap-6 w-full px-6 py-4 bg-white shadow rounded">
      <div className="flex flex-col gap-1 md:gap-4 md:flex-row md:items-center">
        <div className="mt-1.5 min-w-[105px]">
          <div className="w-16 h-6 bg-neutral-200"></div>
        </div>
        <div className="flex flex-col text-sm mt-1 gap-1">
          <div className="w-36 h-5 bg-neutral-200"></div>
          <div className="w-24 h-5 bg-neutral-200"></div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 ml-auto my-auto">
        <div className="h-8 w-8 bg-neutral-200 rounded"></div>
      </div>
    </article>
  </li>
);

const Time = () => <time className="bg-white h-4 w-36 my-3 rounded"></time>;
