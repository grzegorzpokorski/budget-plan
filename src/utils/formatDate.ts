export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(new Date(date));
