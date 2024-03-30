function generateMailToken() {
  // Generate a random number between 10000000 and 99999999
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return randomNumber;
}

export { generateMailToken };
