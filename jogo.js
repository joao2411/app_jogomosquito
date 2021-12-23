//variavel altura do navegador
var altura = 0;
// variavel largura do navegador
var largura = 0;
//variavel vida já com valor 1
var vidas = 1;
//variavel com valor de tempo que será diminuida
var tempo = 15;
// variavel que recebe o tempo (usodo o método no html setInterval, que exibe a posicaoRandomica até o tempo determinado em clearInternal  )
var criaMosquitoTempo = 1500; //1000ms=1 segundo (1500= 15seg)
//recuperar o nível selecionado (pegar tudo depois da interrogação)
var nivel = window.location.search;
//substituir a interrogação"?" por vazio ""
nivel = nivel.replace("?", "");
//se for nivel normal 1500s
if (nivel === "normal") {
  //1500
  //se for fácil vai trocar o tempo que cria o mosquito
  criaMosquitoTempo = 1500;
  ////se não, se for nivel dificil 1000s
} else if (nivel === "dificil") {
  //1000
  criaMosquitoTempo = 1000;
  //se for chucknorris 750s
} else if (nivel === "chucknorris") {
  //750
  criaMosquitoTempo = 750;
}
// função para atualizar o tamanho da ela (colocar dentro do body o onresize e chamar a função ajustarTamanhoPalcoJogo)
function ajustaTamanhoPalcoJogo() {
  //definir que a variavel altura será a altura do navegador
  altura = window.innerHeight;
  //definir que a variavel largura será largura do navegador
  largura = window.innerWidth;
  // exibir a largura e altura do navegador no console
  console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();
//variavel cronometro recebe setInterval= que diminui 1 segundo da variavel tempo, a cada 1000 ms
var cronometro = setInterval(function () {
  tempo -= 1;
//se tempo for menor que 0 vai mostrar vitoria
  if (tempo < 0) {
    //quando o tempo acabar para de executar (limpar) a função cronometro com clearInterval
    clearInterval(cronometro);
    //quando o tempo acabar para de executar (limpar) a função criarmosquito com clearInterval
    clearInterval(criaMosquito);
    //redirecionar para página vitoria
    window.location.href = "vitoria.html";
  } else {
    //se for maior q 0 a cada um minuto ele vai pegar o valor  de cronometro e atualize o tempo do cronometro 
    document.getElementById("cronometro").innerHTML = tempo;
  }
}, 1000);

//função que contém a imagem na qual é chamada no app.html
function posicaoRandomica() {
  //remover o mosquito anterior (caso exista)
  //se existir mosquito remover
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();

    //console.log('elemento selecionado foi: v' + vidas)
    //se eu não clicar no mosquito mais de 3 vezes ( vidas for maior que 3 )
    if (vidas > 3) {
      //aparecer página fim de jogo
      window.location.href = "fim_de_jogo.html";
    } else {
      //se não clicar mais de 3,  deve apresentar coração vazio
      // o elemento id somado com mais 1 definido na var vidas
      document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png";
      //inclementar mais um ao v
      vidas++;
    }
  }
  //gerar um valor aleatório para a posição  da imagem mosquito no navegador dentro do intervalo do tamanho do navegador
  // Math.floor para tirar os valores decimais e deixa-los inteiros 	(-90 é o tamanho em pixel do mosquito3 que é o maior )
  var posicaoX = Math.floor(Math.random() * largura) - 90;
  var posicaoY = Math.floor(Math.random() * altura) - 90;

  posicaoX = posicaoX < 0 ? 0 : posicaoX; //se o valor da variavel posicaoX for menor que zero "(?)" (true) ele retorna zero se não (false) ele retorna o valor posicaoX
  posicaoY = posicaoY < 0 ? 0 : posicaoY; //se o valor da variavel posicaoY for menor que zero "(?)" (true) ele retorna zero se não (false) ele retorna o valor posucaoY

  console.log(posicaoX, posicaoY);

  //criar o elemento html
  //variavel receberar um elemento img (createElemente cria o item no documento html)
  var mosquito = document.createElement("img");
  //mostrar a imagem que deseja aparecer (atributo src= link da imagem)
  mosquito.src = "imagens/mosquito.png";
  //retornar as clases mosquito com a classe lado e apresentar no html
  mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
  //posicionar na esquerda o elemento no valor definido na variavel posicaox concatenado o valor em pixels
  mosquito.style.left = posicaoX + "px";
  //posicionar no eixo y, top,  o elemento no valor definido na variavel posicaoY concatenado o valor em pixels
  mosquito.style.top = posicaoY + "px";
  //informar que o elemento é absoluto, ou seja não estático, assim o elemento varia de posição
  mosquito.style.position = "absolute";
  //criar um id para mosquito
  mosquito.id = "mosquito";
  //quando clicar no elemento mosquito executar função que retorna mosquito por meio do "this" e remove o elemento clicado
  mosquito.onclick = function () {
    this.remove();
  };
  //exibir no body por meio do appendChild o "filho", a variavel mosquito que é o elemento html
  document.body.appendChild(mosquito);
}
// chamar a função tmanhoAleatorio
function tamanhoAleatorio() {
  //gerar um número alatório que vai de zero até 3
  var classe = Math.floor(Math.random() * 3);

  //avaliar a expressão
  switch (classe) {
    //cláusula for 0
    case 0:
      //exibi o mosquito 1 definido no css com tamanho de 50px
      return "mosquito1";
    //cláusula  for 1 (Math.random claculou 1)
    case 1:
      ////exibi o mosquito 1 definido no css com tamanho de 70px
      return "mosquito2";
    //se o número calculado for 2
    case 2:
      ////exibi o mosquito 2 definido no css com tamanho de 90px
      return "mosquito3";
  }
}
//inverter o lado do mosquito ()
function ladoAleatorio() {
  //gerar um número aleatório aprximadamente  2
  var classe = Math.floor(Math.random() * 2);

  switch (classe) {
    //caso 0
    case 0:
      //exibe lado A
      return "ladoA";
    //caso 1
    case 1:
      //exibe lado B
      return "ladoB";
  }
}