/**
 * Function responsible to get all 1h time slots from an interval of dates
 * @param startDate unixtimestamp that represents the first availability time
 * @param endDate unixtimestamp that represents the last availability time
 * @returns
 */
export function getTimeSlots(startDate: number, endDate: number) {
  const range = endDate - startDate;
  const timeSlotInSeconds = 60 * 60;

  if (range < 0 || range % timeSlotInSeconds != 0) return -1;

  let slots = [];
  let count = range / timeSlotInSeconds;

  for (
    let i = 0, current = startDate;
    i < count;
    i++, current += timeSlotInSeconds
  ) {
    slots.push({ startDate: current, endDate: current + timeSlotInSeconds });
  }
  return slots;
}
