document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("#filter .tabs button");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
      });

      button.classList.remove("btn-outline");
      button.classList.add("btn-primary");
    });
  });
});