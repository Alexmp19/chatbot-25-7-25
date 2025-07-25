const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
let pipelineInstance;

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

// Inicializa el modelo (tiny-random-gpt2)
async function initModel() {
  addMessage("Cargando IA, espera un momento...", "bot");
  pipelineInstance = await window.transformers.pipeline("text-generation", "Xenova/tiny-random-gpt2");
  chatBox.lastChild.textContent = "¡IA lista para conversar contigo! ❤️";
}

// Obtiene respuesta del modelo
async function getIAResponse(prompt) {
  const result = await pipelineInstance(prompt, { max_length: 40 });
  return result[0].generated_text.replace(prompt, "").trim();
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

initModel();