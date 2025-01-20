document.addEventListener("DOMContentLoaded", () => {
  const addLinkForm = document.getElementById("add-link-form");
  const showAddLinkFormBtn = document.getElementById("show-add-link-form");

  // Exibir ou ocultar o formulário de adicionar link
  showAddLinkFormBtn.addEventListener("click", () => {
    if (addLinkForm.classList.contains("hidden")) {
      addLinkForm.classList.remove("hidden");
    } else {
      addLinkForm.classList.add("hidden");
    }
  });
});
