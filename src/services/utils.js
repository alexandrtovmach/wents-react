export const dateToInputFormat = (date) => {
  return new Date(date).toISOString().slice(0, 10);
}