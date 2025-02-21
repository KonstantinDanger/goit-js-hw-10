export default function normalizeTimeText(time) {
  const timeStr = time.toString();
  return time < 10 ? timeStr.padStart('2', '0') : timeStr;
}
