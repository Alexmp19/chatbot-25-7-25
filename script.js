const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

let modoOnline = true;

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

// Simula la animación de escritura de las respuestas
const typeText = async (element, text, speed = 30) => {
  element.textContent = "";
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
const obtenerRespuestaNoIaOnline = async (prompt) => {
  try { 
    const response = await fetch('https://servidor-chatbot-25-7-25.onrender.com/no-ia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error al conectar con el servidor online:', error);;
  }
}

// Obtiene respuesta desde el servidor local (opcional)
const obtenerRespuestaNoIaLocal = async (prompt) => {
  try {
    const response = await fetch('http://localhost:3000/no-ia', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt })
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error al conectar con el servidor local:", error);
    return "Perdón amor, no puedo responder ahora, por favor avísale a Alex...";
  }
}

// Función para obtener respuesta del servidor (online o local)
const obtenerRespuestaNoIa = async (prompt) => {
  // Primero intenta obtener respuesta online
  if (modoOnline) {
    const respuestaOnline = await obtenerRespuestaNoIaOnline(prompt);
    if (respuestaOnline) {
      return respuestaOnline;
    } else {
      modoOnline = false; // Cambia a modo local si falla
      console.warn("Fallo al obtener respuesta online, cambiando a modo local.");
    }
  }

  // Si falla, intenta obtener respuesta local
  respuesta = await obtenerRespuestaNoIaLocal(prompt);
  if (!modoOnline && respuesta) return respuesta;
}

// Evento al enviar mensaje
sendBtn.addEventListener('click', async () => {
  const userText = userInput.value.trim();
  if (!userText) return;
  addMessage(userText, 'user');
  userInput.value = '';

  const botMsg = addMessage("...", "bot", true);
  const response = await obtenerRespuestaNoIa(userText);
  await typeText(botMsg, response);
});

// Enter para enviar
userInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter") sendBtn.click();
});
