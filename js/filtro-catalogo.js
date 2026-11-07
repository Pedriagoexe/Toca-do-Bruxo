document.addEventListener("DOMContentLoaded", () => {
  const botoesCategoria = document.querySelectorAll(".destaques-alt .lista-categorias button");
  const cards = document.querySelectorAll(".cards-container .card-item");

  if (!botoesCategoria.length || !cards.length) return;

  function mostrarCategoria(categoriaSelecionada) {
    cards.forEach((card) => {
      const categoriaCard = card.dataset.category;

      if (categoriaSelecionada === "todos" || categoriaCard === categoriaSelecionada) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  botoesCategoria.forEach((botao) => {
    botao.addEventListener("click", () => {
      const categoria = botao.dataset.category;
      if (!categoria) return;

      mostrarCategoria(categoria);

      botoesCategoria.forEach((btn) => btn.classList.remove("categoria-ativa"));
      botao.classList.add("categoria-ativa");
    });
  });
});