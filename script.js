function playAudio() {
  const audio = document.getElementById('sound-confirm');

  audio.play();
}

function playAudioError() {
  const audio = document.getElementById('sound-error');

  audio.play();
}

function playInput() {
  const audio = document.getElementById('sound-input');

  audio.play();
}

const searchCandidate = (candidateNumber) => {
  const cand = [
    {
      name: 'Dr. Sheldon Cooper',
      numberCandidate: '42',
      party: 'PFIS',
      candidatePhoto:
        'https://i.pinimg.com/736x/03/3d/16/033d16df9c58b51bbdef02cd1a258230--live-long-bigbang.jpg'
    },
    {
      name: 'Julius Rock',
      numberCandidate: '10',
      party: 'PC',
      candidatePhoto:
        'https://vandal-us.s3.amazonaws.com/spree/products/59f3f2be87180800c58c507a/original/open-uri20180924-12-1fxzj20.jpg'
    },
    {
      name: 'Agostinho Carrara',
      numberCandidate: '71',
      party: 'PFAM',
      candidatePhoto:
        'https://i.pinimg.com/474x/36/1d/5a/361d5aadea694e8a8ba41ccdbb5cbc6b.jpg'
    },
    {
      name: 'Seu Madruga',
      numberCandidate: '72',
      party: 'PBV',
      candidatePhoto:
        'https://i.pinimg.com/originals/67/06/76/670676839843ee69b47a1056dd1db95d.jpg'
    },
    {
      name: 'Beiçola',
      numberCandidate: '60',
      party: 'PPAS',
      candidatePhoto:
        'http://bp3.blogger.com/_IX0i_0bTXk0/SCoKHz_wliI/AAAAAAAAABs/BqxqANNKFOw/s320/beicola.bmp'
    }
  ];

  // Mapeando o array cand com o método find() que retorna o primeiro elemento do array que atender a condição informada
  // A condição é que o número armazenado no parâmetro seja igual a propriedade numberCandidate de um dos objetos do array cand=[],
  // Atribuindo dentro da variável foundCandidate
  const foundCandidate = cand.find((item) => {
  return item.numberCandidate === candidateNumber;
  });

  // Retornando o candidato apenas se corresponder ao número digitado
  if(foundCandidate) {
    return foundCandidate;
  }

return false;
}

// Receber o número do candidato como parâmetro
function receiveCandidateNumber(candidateNumber) {
  playInput();
  // Buscando input com id #first-number
  const firstNumber = document.querySelector('#first-number');

  // Verificando se o valor de firstNumber está vazio
  if(firstNumber.value === '') {
    // Se estiver vazio, adiciona o valor recebido da função no valor do input, encerrando com return
    firstNumber.value = candidateNumber;

    return;
  }

  // Se firstNumber não estiver vazio
  if(firstNumber.value !== '') {
    // Buscando input com id #second-number
    const secondNumber = document.querySelector('#second-number');
    // adiciona o valor recebido da função no valor de secondNumber
    secondNumber.value = candidateNumber;
  }

  // Buscando input com id #second-number
  const secondNumber = document.querySelector('#second-number');

  // Chamando a função que busca um candidato, recebendo como parâmetro o número do candidato que é a concatenação do valor do input com id #first-number 
  // mais o valor do input #second-number
  // atribuindo à variável candidate o candidato retornado pela função. 
  const candidate = searchCandidate(firstNumber.value + secondNumber.value);

  // Caso o valor de candidate corresponda a algum elemento dentro de objeto do array, mostrar na tela as informações correspondentes
  if(candidate) {
   const photo = document.querySelector('#photo');
   photo.src = candidate.candidatePhoto;

   const name = document.querySelector('#candidateName');
   name.innerHTML = `Nome: ${candidate.name}`; 

   const party = document.querySelector('#candidateParty');
   party.innerHTML = `Partido: ${candidate.party}`;
  }
}

// Função com a tarefa de limpar os dados com o acionamento do botão Corrigir
const clearInfo = function () {
  const photo = document.querySelector('#photo');
  photo.src = "https://iotorrino.com.br/wp-content/uploads/2021/04/no-avatar.png";

  const first = document.querySelector('#first-number');
  first.value = ""; 

  const second = document.querySelector('#second-number');
  second.value = ""; 
   
  const name = document.querySelector('#candidateName');
  name.innerHTML = `Nome: `; 

  const party = document.querySelector('#candidateParty');
  party.innerHTML = `Partido: `;
}

// Registra e confirma o voto em branco
const whiteVote = function () {
  clearInfo();
  playAudio();
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: `Voto em branco!`,
    showConfirmButton: false,
    timer: 2000
  })
}

// Confirma o voto tanto para candidatos existentes, quanto para números sem correspondência
const registerVote = function () {
  const firstInput = document.querySelector('#first-number');
  const secondInput = document.querySelector('#second-number');

  // Pede que se digite o número caso um dos campos esteja vazio ao ser acionado o botão Confirma
   if(firstInput.value === '' || secondInput.value === '') {
    playAudioError();
    Swal.fire({
      position: 'top-center',
      icon: 'info',
      title: `Digite o número do candidato!`,
      showConfirmButton: false,
      timer: 2000
    })

    return;
  }

  // Armazena o número concatenado dos dois inputs
  const result = firstInput.value + secondInput.value;

  // Atribui a função searchCandidate() a uma variável, passando a concatenação dos inputs como parâmetro
  const chosenCandidate = searchCandidate(result);

  // Caso a concatenação tenha dois dígitos e o número resultante corresponda ao de uma das chaves do array de objetos, confirmar o voto com mensagem ao acionar o botão Confirmar  
  if(Object.keys(chosenCandidate).length > 1){
    playAudio();
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: `Voto confirmado em\n${chosenCandidate.name}`,
      showConfirmButton: false,
      timer: 2000
    })

    // Limpar tela assim que o voto for confirmado
    clearInfo();

    // Caso o número com dois dígitos não seja de um dos candidatos do array, confirmar sem mostrar informações
  } else {
    playAudio();
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: `Voto nulo!`,
      showConfirmButton: false,
      timer: 2000
    })
    // Limpar tela assim que o voto for confirmado
    clearInfo();
  }
}





