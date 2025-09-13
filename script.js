const facts = [
  "A group of kangaroos is called a mob 🦘",
  "Octopuses have three hearts ❤️❤️❤️",
  "Bananas are berries, but strawberries aren't 🍌🍓",
  "Honey never spoils—archaeologists found edible honey in ancient tombs 🍯",
  "Sharks existed before trees 🌳🦈"
];

function generateFact() {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  document.getElementById("fact").textContent = fact;
  speak(fact);
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

function handleChat() {
  const input = document.getElementById("userInput").value;
  const chatbox = document.getElementById("chatbox");

  const userMsg = document.createElement("p");
  userMsg.textContent = "You: " + input;
  chatbox.appendChild(userMsg);

  const response = generateResponse(input);
  const botMsg = document.createElement("p");
  botMsg.textContent = "Copilot: " + response;
  chatbox.appendChild(botMsg);

  speak(response);
  saveChat("You: " + input, "Copilot: " + response);
  document.getElementById("userInput").value = "";
}

function generateResponse(input) {
  input = input.toLowerCase();
  if (input.includes("joke")) {
    return "Why don't scientists trust atoms? Because they make up everything!";
  } else if (input.includes("help")) {
    return "I'm here to help! Ask me anything about life, ideas, or fun facts.";
  } else {
    return "That's interesting! Let me think about it...";
  }
}

function saveChat(user, bot) {
  let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.push({ user, bot });
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

function loadChat() {
  const chatbox = document.getElementById("chatbox");
  let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.forEach(entry => {
    const userMsg = document.createElement("p");
    userMsg.textContent = entry.user;
    chatbox.appendChild(userMsg);

    const botMsg = document.createElement("p");
    botMsg.textContent = entry.bot;
    chatbox.appendChild(botMsg);
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

document.getElementById("themeToggle").addEventListener("click", toggleTheme);
window.onload = () => {
  generateFact();
  loadChat();
};