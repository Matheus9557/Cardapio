const nomePratoInput = document.querySelector("#nome-prato");
const ingredientesPratoInput = document.querySelector("#ingredientes-prato");
const nomePratoSearch = document.querySelector("#busca-prato");
const cadastrarPratoBt = document.querySelector("#cadastro-prato");
const preçoPratoInput = document.querySelector("#preço-prato");

const localStoragePratos = JSON.parse(localStorage.getItem("pratos"));
let pratos = localStorage.getItem("pratos") !== null ? localStoragePratos : [];

function carregarPratos(listaPratos) {
  const lista = document.querySelector("ul");
  lista.innerHTML = "";
  listaPratos.forEach((prato) => {
    const novoItemLista = document.createElement("li");

    const novoItemListaTexto = document.createElement("span");
    novoItemListaTexto.textContent = `${prato.nome} -> ${prato.ingredientes} -> ${prato.preço}`;
    novoItemLista.appendChild(novoItemListaTexto);

    lista.appendChild(novoItemLista);
    updateLocalStorage();
  });
}

const updateLocalStorage = () => {
  localStorage.setItem("pratos", JSON.stringify(pratos));
};

cadastrarPratoBt.addEventListener("click", (event) => {
  const nomePrato = nomePratoInput.value;
  const ingredientesPrato = ingredientesPratoInput.value.split(",");
  const preçoPrato = preçoPratoInput.value;

  if (nomePrato != null && nomePrato !== "") {
    pratos.push({
      nome: nomePrato,
      ingredientes: ingredientesPrato,
      preço: preçoPrato
    });
    nomePratoInput.value = "";
  }
  carregarPratos(pratos);
  updateLocalStorage();
});

nomePratoSearch.addEventListener("keyup", (event) => {
  const textoBusca = event.target.value;
  const pratosFiltrados = pratos.filter(
    (prato) =>
      prato.nome.toUpperCase().includes(textoBusca.toUpperCase()) ||
      prato.ingredientes.filter((ingrediente) =>
        ingrediente.toUpperCase().includes(textoBusca.toUpperCase())
      ).length > 0
  );
  updateLocalStorage();
  carregarPratos(pratosFiltrados);
});

carregarPratos(pratos);

updateLocalStorage();
