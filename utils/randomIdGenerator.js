const randomIdGenerator = () => {
  const chars = "abcdefghijklmnopqrstuvwxyx123456789";
  let id = "";
  for (i = 0; i < 14; i++) {
    if (i == 0 || i == 1 || i == 2 || i == 3) {
      id += Math.floor(Math.random() * 10);
      continue;
    }
    if (i == 4) {
      id += "_";
      continue;
    }
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};
module.exports = randomIdGenerator;
