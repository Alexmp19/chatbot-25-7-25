exports.getIAResponse = async (prompt) => {
  // Aquí puedes reemplazar con lógica real de IA en el futuro
  const frases = [
    "Eres la razón de mi felicidad ❤️",
    "Me encanta estar a tu lado.",
    "Tu sonrisa ilumina mi mundo.",
    "Eres mi lugar favorito.",
    "Cada día contigo es único y especial."
  ];

  const respuesta = frases[Math.floor(Math.random() * frases.length)];
  return respuesta;
};
