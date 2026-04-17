export const formatGetTime = (date?: Date | string) => {
  if (!date) return "";
  const time = new Date(date);
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};
