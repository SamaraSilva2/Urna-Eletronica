function playAudio() {
  const audio = document.getElementById('som-confirma');

  audio.play();
}

function playAudioErro() {
  const audio = document.getElementById('som-erro');

  audio.play();
}

function playDigito() {
  const audio = document.getElementById('som-digito');

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

  // Mapeando o array cand com o método find() que retorna o primeiro elemento que achar no array que atender a condição informada
  // Condição o número do candidato informado no parâmetro é igual a propriedade numberCandidate de um dos objetos do array
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
  playDigito();
  // Buscando input com id #first-number
  const firstNumber = document.querySelector('#first-number');

  // Verificando se o valor do input firstNumber está vazio
  if(firstNumber.value === '') {
    // Se estiver vazio, adiciona o valor recebido da função no valor do input, encerrando com return
    firstNumber.value = candidateNumber;

    return;
  }

  // Se firstNumber não estiver vazio
  if(firstNumber.value !== '') {
    // Buscando input com id #second-number
    const secondNumber = document.querySelector('#second-number');
    // adiciona o valor recebido da função no valor do input com id #second-number
    secondNumber.value = candidateNumber;
  }

  // Buscando input com id #second-number
  const secondNumber = document.querySelector('#second-number');

  // Chamando a função que busca um candidato, recebendo como parâmetro o número do candidato que é a concatenação do valor do input com id #first-number 
  // mais o valor do input #second-number
  // atribuindo a variável candidate o candidato retornado pela função. 
  const candidate = searchCandidate(firstNumber.value + secondNumber.value);

  if(candidate) {
   const photo = document.querySelector('#photo');
   photo.src = candidate.candidatePhoto;

   const name = document.querySelector('#candidateName');
   name.innerHTML = `Nome: ${candidate.name}`; 

   const party = document.querySelector('#candidateParty');
   party.innerHTML = `Partido: ${candidate.party}`;
  }
}

const clearInfo = function () {
  const photo = document.querySelector('#photo');
  photo.src = "https://community.adobe.com/legacyfs/online/avatars/a829412_stormtrooper_001.png";

  const first = document.querySelector('#first-number');
  first.value = ""; 

  const second = document.querySelector('#second-number');
  second.value = ""; 
   
  const name = document.querySelector('#candidateName');
  name.innerHTML = `Nome: `; 

  const party = document.querySelector('#candidateParty');
  party.innerHTML = `Partido: `;
}

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

const registerVote = function () {
  const firstInput = document.querySelector('#first-number');
  const secondInput = document.querySelector('#second-number');

   if(firstInput.value === '' || secondInput.value === '') {
    playAudioErro();
    Swal.fire({
      position: 'top-center',
      icon: 'info',
      title: `Digite o número do candidato!`,
      showConfirmButton: false,
      timer: 2000
    })

    return;
  }

  const result = firstInput.value + secondInput.value;
  
  const chosenCandidate = searchCandidate(result);

  if(Object.keys(chosenCandidate).length > 1){
    playAudio();
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: `Voto confirmado em\n${chosenCandidate.name}`,
      showConfirmButton: false,
      timer: 2000
    })

    clearInfo();
  } else {
    playAudio();
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: `Voto nulo!`,
      showConfirmButton: false,
      timer: 2000
    })

    clearInfo();
  }
}





