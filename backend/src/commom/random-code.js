function randomCode() {
  // gearar um código aleatório de 6 digtos
  const code = Math.floor(100000 + Math.random() * 900000);
  return code;
}

module.exports = randomCode;
