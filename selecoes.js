const selecoes = [
  {id: 'BRA', nome: 'Brasil', rank: 1, conf: 'CONMEBOL'},
  {id: 'BEL', nome: 'Bélgica', rank: 2, conf: 'UEFA'},  
  {id: 'ARG', nome: 'Argentina', rank: 3,  conf: 'CONMEBOL'},
  {id: 'SMR', nome: 'San Marino', rank: 211,  conf: 'UEFA'},
]

const listaCopa = document.getElementById('copa');
const listaA = document.getElementById('time-a');
const listaB = document.getElementById('time-b');
const buttonJogar = document.getElementById('button-jogar');
const campo = document.getElementById('jogo');
const bandeiraA = document.getElementById('bandeira-a');
const bandeiraB = document.getElementById('bandeira-b');
const tempo = document.getElementById('tempo');


let golA = 0;
let golB = 0;
let tempoPercorrido = 0;

const listaValor = (selecoesParticipantes, lista) => {
  selecoesParticipantes.forEach((elemento) => {
    const selecao = document.createElement('option');
    selecao.innerHTML = elemento.nome;
    selecao.value = elemento.id;
    lista.appendChild(selecao);
  })
  
}

// listaCopa.addEventListener('change', listaValor); A ser implementado

const timeAEscFlag = () => {
  bandeiraA.style.backgroundImage = `url('img/${listaA.value}.png')`;
}

const timeAFlag = document.createElement('div');
campo.appendChild(timeAFlag);

const timeA = document.createElement('p');
campo.appendChild(timeA);

const placar = document.createElement('p');
campo.appendChild(placar);

const timeB = document.createElement('p');
campo.appendChild(timeB);

const timeBFlag = document.createElement('div');
campo.appendChild(timeBFlag);

const tempoDePartida = () => {
  if (tempoPercorrido === 0) {
    tempo.innerHTML = 'Final do Primeiro Tempo de partida';
  } else if (tempoPercorrido === 1) {
    tempo.innerHTML = 'Final de partida';
  }
};

const timeBEscFlag = () => {
  bandeiraB.style.backgroundImage = `url('img/${listaB.value}.png')`;
}

const timeAEscolhido = () => {
  const escolhaA = selecoes.find((elemento) => elemento.id === listaA.value);
  timeA.innerText = `${escolhaA.nome}
(${escolhaA.id})
${escolhaA.conf}`;
}

const timeBEscolhido = () => {
  const escolhaB = selecoes.find((elemento) => elemento.id === listaB.value);
  timeB.innerText = `${escolhaB.nome}
(${escolhaB.id})
${escolhaB.conf}`;
}

const teveGol40 = () => {
  const numeroMagico = Math.floor(Math.random() * 10 + 1);
  console.log(numeroMagico);
  if (numeroMagico % 3 === 0 || numeroMagico === 7) {
    return true
  }
}

const teveGol50 = () => {
  const numeroMagico = Math.floor(Math.random() * 10 + 1);
  console.log(numeroMagico);
  if (numeroMagico % 2 === 0) {
    return true
  }
}

const teveGol60 = () => {
  const numeroMagico = Math.floor(Math.random() * 10 + 1);
  console.log(numeroMagico);
  if (numeroMagico % 2 === 0 || numeroMagico % 5 === 0) {
    return true
  }
}

const teveGol70 = () => {
  const numeroMagico = Math.floor(Math.random() * 10 + 1);
  console.log(numeroMagico);
  if (numeroMagico % 2 === 0 || numeroMagico % 3 === 0) {
    return true
  }
}

const quantosGols = (porcentagem) => {
  let contador = 0;
  let novo = true;
  for (let index = 0; novo === true; index += 1) {
    novo = porcentagem();
    if (novo) {
      contador += 1;
    } if (contador > 6) {
      return contador;
    }     
  }
  return contador;
}

const novoGol = (timeA, timeB) => {
    if (Math.abs(timeA.rank - timeB.rank) < 20) {
    return quantosGols(teveGol40);
  } else if (Math.abs(timeA.rank - timeB.rank) < 50) {
    return quantosGols(teveGol50);
  } else if (Math.abs(timeA.rank - timeB.rank) < 100) {
    return quantosGols(teveGol60);
  } else {
    return quantosGols(teveGol70);
  }
};

const golsA = () => {
  const gol = selecoes.find((elemento) => listaA.value === elemento.id);
  const gols = Math.round(Math.random() * 5 - gol.rank);
  if (gols > 0) {
    return gols
  }
  return 0;
}

const golsB = () => {
  const gol = selecoes.find((elemento) => listaB.value === elemento.id);
  const gols = Math.round(Math.random() * 5 - gol.rank);
  if (gols > 0) {
    return gols
  }
  return 0;
}

const placarAtualizado = (golA, golB) => {
  placar.innerHTML = `${golA} x ${golB}`;
}

const rodaJogo = (event) => {
  const timeA = selecoes.find((elemento) => listaA.value === elemento.id);
  const timeB = selecoes.find((elemento) => listaB.value === elemento.id);
  if (timeA === timeB) {return alert('Seleções escolhidas são iguais')}
  if (tempoPercorrido === 2) {
    golA = 0;
    golB = 0;
    placarAtualizado(0, 0)
  } else {
    event.preventDefault();
    tempoDePartida();
    timeAEscFlag();
    timeAEscolhido();
    placarAtualizado();
    timeBEscolhido();
    timeBEscFlag();
    comparaSeFoiGol(novoGol(timeA, timeB));
    placarAtualizado(golA, golB);
  };
}

listaValor(selecoes, listaA);
listaValor(selecoes, listaB);

buttonJogar.addEventListener('click', rodaJogo);

// Formula gol: Chance é floor 101 - (rank da seleção / 2)

const chance = Math.round(106 - selecoes[3].rank / 2);

const comparaSeFoiGol = (gols) => {
  for(let index = 1; index <= gols; index += 1) {
    const timeA = selecoes.find((elemento) => listaA.value === elemento.id);
    const jogadaA = Math.floor(Math.random() * 100 + 1);
    let chanceA;
    if (jogadaA >= 50) {
      chanceA = Math.round(106 - timeA.rank / 2) + (jogadaA - 50) * 2;
    } else {
      chanceA = Math.round(106 - timeA.rank / 2) - (50 - jogadaA) * 2;
    }
    const timeB = selecoes.find((elemento) => listaB.value === elemento.id);
    const jogadaB = Math.floor(Math.random() * 100 + 1);  
    let chanceB;
    if (jogadaB >= 50) {
      chanceB = Math.round(106 - timeB.rank / 2) + (jogadaB - 50) * 2;
    } else {
      chanceB = Math.round(106 - timeB.rank / 2) - (50 - jogadaB) * 2;
    }
    console.log(`Time A: ${chanceA}`);
    console.log(`Time B: ${chanceB}`);
    if (chanceA > chanceB) {
      golA += 1;
    } else if (chanceB > chanceA) {
      golB += 1
    }
  };
  tempoPercorrido += 1;
};
