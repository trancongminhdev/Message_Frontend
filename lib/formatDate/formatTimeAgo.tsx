export default function formatTimeAgo(dateInput: Date | string): string {
  const now = Date.now();
  const date = new Date(dateInput).getTime();

  const diffMs = now - date;

  const minuteMs = 60 * 1000;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;
  const weekMs = 7 * dayMs;
  const monthMs = 30 * dayMs;
  const yearMs = 365 * dayMs;

  if (diffMs < dayMs) {
    const hours = Math.floor(diffMs / hourMs);
    const minutes = Math.floor((diffMs % hourMs) / minuteMs);

    if (hours === 0) {
      return `${minutes} phút`; // < 1h
    }

    return `${hours}:${minutes.toString().padStart(2, "0")}`; // hh:mm
  }

  if (diffMs < weekMs) {
    const days = Math.floor(diffMs / dayMs);
    return `${days} ngày`;
  }

  if (diffMs < monthMs) {
    const weeks = Math.floor(diffMs / weekMs);
    return `${weeks} tuần`;
  }

  if (diffMs < yearMs) {
    const months = Math.floor(diffMs / monthMs);
    return `${months} tháng`;
  }

  const years = Math.floor(diffMs / yearMs);
  return `${years} năm`;
}
