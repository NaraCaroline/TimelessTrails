// script.js

// Lógica para os botões de rolagem dos destinos populares
const destinationsContainer = document.getElementById("destinationsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", () => {
  destinationsContainer.scrollBy({
    left: -destinationsContainer.offsetWidth / 2, // Rola metade da largura do contêiner
    behavior: "smooth",
  });
});

nextBtn.addEventListener("click", () => {
  destinationsContainer.scrollBy({
    left: destinationsContainer.offsetWidth / 2, // Rola metade da largura do contêiner
    behavior: "smooth",
  });
});

// Lógica para o modal de ideias de viagem
const planGroupTripBtn = document.getElementById("planGroupTripBtn");
const travelIdeaModal = document.getElementById("travelIdeaModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const generateIdeasBtn = document.getElementById("generateIdeasBtn");
const groupTripDescription = document.getElementById("groupTripDescription");
const loadingIndicator = document.getElementById("loadingIndicator");
const travelIdeasOutput = document.getElementById("travelIdeasOutput");

planGroupTripBtn.addEventListener("click", () => {
  travelIdeaModal.style.display = "flex"; // Mostra o modal
  travelIdeasOutput.innerHTML = ""; // Limpa o output anterior
  groupTripDescription.value = ""; // Limpa a descrição anterior
});

closeModalBtn.addEventListener("click", () => {
  travelIdeaModal.style.display = "none"; // Esconde o modal
});

// Fecha o modal se o utilizador clicar fora do conteúdo
window.addEventListener("click", (event) => {
  if (event.target == travelIdeaModal) {
    travelIdeaModal.style.display = "none";
  }
});

generateIdeasBtn.addEventListener("click", async () => {
  const prompt = groupTripDescription.value.trim();
  if (!prompt) {
    travelIdeasOutput.innerHTML =
      '<p class="text-red-500">Por favor, descreva a sua viagem de grupo para gerar ideias.</p>';
    return;
  }

  loadingIndicator.classList.remove("hidden"); // Mostra o indicador de carregamento
  travelIdeasOutput.innerHTML = ""; // Limpa o output anterior

  try {
    let chatHistory = [];
    chatHistory.push({
      role: "user",
      parts: [
        {
          text: `Gere ideias de viagem para um grupo com as seguintes características: ${prompt}. Inclua sugestões de destinos, atividades e um breve itinerário.`,
        },
      ],
    });
    const payload = { contents: chatHistory };
    const apiKey = ""; // A API key será fornecida em runtime pelo ambiente Canvas.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      const text = result.candidates[0].content.parts[0].text;
      travelIdeasOutput.innerHTML = `<h4 class="font-semibold text-lg mb-2">As suas ideias de viagem:</h4><p>${text}</p>`;
    } else {
      travelIdeasOutput.innerHTML =
        '<p class="text-red-500">Não foi possível gerar ideias de viagem. Por favor, tente novamente.</p>';
    }
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    travelIdeasOutput.innerHTML =
      '<p class="text-red-500">Ocorreu um erro ao gerar ideias de viagem. Por favor, tente novamente mais tarde.</p>';
  } finally {
    loadingIndicator.classList.add("hidden"); // Esconde o indicador de carregamento
  }
});
