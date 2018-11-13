export const dateToInputFormat = (date) => {
  return new Date(date).toISOString().slice(0, 10);
}

export const generateHashWithDate = () => {
  return `${Date.now()}-${Math.random().toString().slice(-5)}`
};