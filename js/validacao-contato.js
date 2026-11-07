document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-bruxo");

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const assunto = document.getElementById("assunto");
  const mensagem = document.getElementById("mensagem");

  if (!form) return;

  const campos = [nome, email, assunto, mensagem];

  function aplicarEstiloBase(campo) {
    campo.style.border = "1px solid #4e4e4e";
    campo.style.boxShadow = "none";
  }

  function aplicarErro(campo) {
    campo.style.border = "1px solid #b33a3a";
    campo.style.boxShadow = "0 0 6px rgba(179, 58, 58, 0.35)";
  }

  function aplicarSucesso(campo) {
    campo.style.border = "1px solid #ceb62c";
    campo.style.boxShadow = "0 0 6px rgba(206, 182, 44, 0.25)";
  }

  function limparMensagens() {
    document.querySelectorAll(".mensagem-erro, .mensagem-sucesso")
      .forEach(msg => msg.remove());

    campos.forEach(campo => aplicarEstiloBase(campo));
  }

  function criarMensagemErro(campo, texto) {
    const erro = document.createElement("small");

    erro.classList.add("mensagem-erro");
    erro.textContent = texto;

    erro.style.color = "#e08b8b";
    erro.style.fontSize = "13px";
    erro.style.marginTop = "4px";
    erro.style.display = "block";

    campo.insertAdjacentElement("afterend", erro);

    aplicarErro(campo);
  }

  function criarMensagemSucesso(texto) {
    const sucesso = document.createElement("p");

    sucesso.classList.add("mensagem-sucesso");
    sucesso.textContent = texto;

    sucesso.style.color = "#d7bb63";
    sucesso.style.fontSize = "15px";
    sucesso.style.marginTop = "10px";
    sucesso.style.textAlign = "center";

    form.appendChild(sucesso);
  }

  function emailValido(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(valor);
  }

  function validarNome() {
    const valor = nome.value.trim();

    if (valor === "") {
      criarMensagemErro(nome, "Identifique-se, caro viajante.");
      return false;
    }

    if (valor.length < 3) {
      criarMensagemErro(nome, "O nome deve ter pelo menos 3 caracteres.");
      return false;
    }

    aplicarSucesso(nome);
    return true;
  }

  function validarEmail() {
    const valor = email.value.trim();

    if (valor === "") {
      criarMensagemErro(email, "Você esqueceu de nos informar o e-mail!");
      return false;
    }

    if (!emailValido(valor)) {
      criarMensagemErro(email, "Este e-mail não existe no Continente.");
      return false;
    }

    aplicarSucesso(email);
    return true;
  }

  function validarAssunto() {
    const valor = assunto.value.trim();

    if (valor === "") {
      criarMensagemErro(assunto, "Informe o assunto da mensagem.");
      return false;
    }

    if (valor.length < 4) {
      criarMensagemErro(assunto, "O assunto deve ter pelo menos 4 caracteres.");
      return false;
    }

    aplicarSucesso(assunto);
    return true;
  }

  function validarMensagem() {
    const valor = mensagem.value.trim();

    if (valor === "") {
      criarMensagemErro(mensagem, "Você ainda não nos escreveu nenhuma mensagem.");
      return false;
    }

    if (valor.length < 10) {
      criarMensagemErro(mensagem, "A mensagem deve ter pelo menos 10 caracteres.");
      return false;
    }

    aplicarSucesso(mensagem);
    return true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    limparMensagens();

    const nomeOk = validarNome();
    const emailOk = validarEmail();
    const assuntoOk = validarAssunto();
    const mensagemOk = validarMensagem();

    if (nomeOk && emailOk && assuntoOk && mensagemOk) {
      criarMensagemSucesso(
        "Mensagem enviada com sucesso para a Toca do Bruxo!"
      );

      form.reset();

      campos.forEach(campo => aplicarEstiloBase(campo));
    }
  });
});