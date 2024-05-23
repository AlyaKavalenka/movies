export default function getTimeFromMins(mins: number) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;

  return `${hours}h ${minutes}m`;
}
