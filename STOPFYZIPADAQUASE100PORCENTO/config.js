const container = document.querySelector('.slides'); // Seletor correto
const items = document.querySelectorAll('.slides-musica'); // Seleciona todas as divs com a classe 'linha'
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const totalItems = items.length;

let currentIndex = 0;
const intervalTime = 3000; // Tempo para troca automática (em ms)

function updateCarousel() {
    const itemWidth = items[0].offsetWidth; // Largura de um item
    container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    // container.style.transform     = `translateX(-${currentIndex * 100}%)`;
};


function showNext() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

// Botões de navegação
nextButton.addEventListener('click', showNext);
prevButton.addEventListener('click', showPrev);

// Troca automática
let autoSlide = setInterval(showNext, intervalTime);

// Pausar ao interagir com os botões
nextButton.addEventListener('mouseenter', () => clearInterval(autoSlide));
prevButton.addEventListener('mouseenter', () => clearInterval(autoSlide));
nextButton.addEventListener('mouseleave', () => autoSlide = setInterval(showNext, intervalTime));
prevButton.addEventListener('mouseleave', () => autoSlide = setInterval(showNext, intervalTime));

const divShow = document.getElementById('divshow');
const musicDivs = document.querySelectorAll('.musica');
const audio = document.getElementById('player');
const audioSource = document.getElementById('audioSource');

  // Adiciona um evento de clique a cada div com a classe "musica"
  musicDivs.forEach((div) => {
    div.addEventListener('click', () => {
      // Obtém a imagem de fundo da div clicada
      const bgImage = window.getComputedStyle(div).backgroundImage;

      // Define a mesma imagem de fundo na div "divshow"
      divShow.style.backgroundImage = bgImage;

      // Copia o conteúdo interno da div clicada para a div "divshow"
      divShow.innerHTML = div.innerHTML;

      // Obtém o caminho da música a partir do atributo "data-music" da div clicada
      const newSrc = div.getAttribute('data-music');

      // Atualiza o src do áudio com o novo arquivo
      audioSource.src = newSrc;

      // Recarrega o áudio para que a nova música comece a tocar
      audio.load();
      audio.play();
    });
  });

