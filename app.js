const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

// Función para agregar mensajes
function addMessage(text, sender, typing = false) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  if (typing) msg.classList.add('typing');
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

// Simula la animación de escritura
function typeText(element, text, speed = 30) {
  element.textContent = '';
  let i = 0;
  return new Promise(resolve => {
    const interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        element.classList.remove('typing');
        resolve();
      }
    }, speed);
  });
}

// Obtiene respuesta desde el servidor (en lugar de pipeline local)
async function getIAResponse(prompt) {
  try {
    const response = await fetch('http://localhost:3000/ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    return "Ups... no puedo responder ahora 😢";
  }
}

// Evento al enviar mensaje
sendBtn.addEventListener('click', async () => {
  const userText = userInput.value.trim();
  if (!userText) return;
  addMessage(userText, 'user');
  userInput.value = '';

  const botMsg = addMessage("...", "bot", true);
  const response = await getIAResponse(userText);
  await typeText(botMsg, response);
});

// Enter para enviar
userInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter") sendBtn.click();
});
