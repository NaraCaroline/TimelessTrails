const destinationsContainer = document.getElementById("destinationsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", () => {
  destinationsContainer.scrollBy({
    left: -destinationsContainer.offsetWidth / 2,
    behavior: "smooth",
  });
});

nextBtn.addEventListener("click", () => {
  destinationsContainer.scrollBy({
    left: destinationsContainer.offsetWidth / 2,
    behavior: "smooth",
  });
});
