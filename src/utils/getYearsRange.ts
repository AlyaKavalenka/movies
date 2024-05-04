export default function getYearsRange(
  range: { from: number; to: number },
  sortBy: 'old' | 'new',
) {
  const arr = [];

  for (let i = range.from; i <= range.to; i += 1) {
    arr.push(i);
  }

  if (sortBy === 'new') {
    arr.sort((a, b) => b - a);
  }

  return arr.map((item) => item.toString());
}
