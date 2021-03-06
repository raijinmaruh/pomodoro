const $botao_inicio = document.querySelector(".clock__botao");
const $status = document.querySelector(".clock__status");
const $temporizador_principal = document.querySelector(".clock__numero");
const $botao_comecar = document.querySelector(".clock__start");
const $ciclos = document.querySelector(".clock__ciclos");
const $valor_trabalho = parseInt(sessionStorage.getItem("trabalho"));
const $valor_etapas = parseInt(sessionStorage.getItem("sessao"));
let ativo = document.querySelector(".botao__inicia");
let pausado = document.querySelector(".botao__pausa");
let estado = false; // true == ativo; | false == pausado;
let segundos = 60;
let minutos = $valor_trabalho - 1;
let contagem_ciclos = 0;
let decrementar; // tive que fazer isso aqui
// Função para fazer com que o número de zeros a esqueda seja suficiente
Number.prototype.pad = function(tamanho) {
  var string = String(this);
  while (string.length < (tamanho || 2)) {string = "0" + string;}
  return string;
}

$temporizador_principal.textContent = `${$valor_trabalho.pad()}:00`;
$botao_comecar.addEventListener('click', mudarEstado);

function retomar() {
	/* 
	caso seja feita uma parada, o número que 
	será enviado a variável segundos é uma string, 
	por isso a necessidade do parseInt
	*/
	let segundos_contados = parseInt(segundos);
	let minutos_contados = parseInt(minutos);
	
	if (minutos_contados >= 0 && segundos_contados >= 1) {
		decrementar = setInterval( _ => {
			segundos_contados--;
			$temporizador_principal.textContent = `${minutos_contados.pad()}:${segundos_contados.pad()}`;
			if (minutos_contados == 0 && segundos_contados == 0) {
				contagem_ciclos++;
				clearInterval(decrementar);
				mudarEstado();
			}
			if (segundos_contados == 0) {
				minutos_contados--;
				segundos_contados = 60;
			}
		
		},1000);	
	}
	
}

function pausar(tarefa) {
	clearInterval(tarefa);
	let minutos_restantes = $temporizador_principal.textContent.slice(0,2);
	let segundos_restantes = $temporizador_principal.textContent.slice(3,5);
	segundos = segundos_restantes;
	minutos = minutos_restantes;
}

function mudarEstado() {
	if (estado) {
		estado = false;
		pausar(decrementar);
		ativo.classList.toggle('escondido');
		pausado.classList.toggle('escondido');
		$status.textContent = "Pausa";
		$status.style.color = '#F2C94C';
	}
	else {
		estado = true;
		retomar();
		pausado.classList.toggle('escondido');
		ativo.classList.toggle('escondido');
		$status.textContent = "Trabalho";
		$status.style.color = '#219653';
	}
}
console.log($valor_etapas);

for (let i = 0; i < $valor_etapas; i++) {
	let ciclo = document.createElement('li');
	ciclo.classList.add('clock__ciclo');
	$ciclos.appendChild(ciclo);
}

$botao_inicio.addEventListener('click' , _ => window.open("./inicio.html", "_self"));