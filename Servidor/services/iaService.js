exports.getIAResponse = async (prompt) => {
  // Aquí puedes reemplazar con lógica real de IA en el futuro
  const frases = require('../json/frases de amor.json')["frases de amor"];

  const respuesta = frases[Math.floor(Math.random() * frases.length)];
  return respuesta;
};
