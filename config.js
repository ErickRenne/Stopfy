const container = document.querySelector('.slides'); // Seletor correto
const items = document.querySelectorAll('.slides-musica'); // Seleciona todas as divs com a classe 'linha'
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const totalItems = items.length;
const divShow = document.getElementById('divshow');
const audio = document.getElementById('player');
const audioSource = document.getElementById('audioSource');

let currentIndex = 0;
const intervalTime = 3000; // Tempo para troca automática (em ms)

function updateCarousel() {
    const itemWidth = items[0].offsetWidth; // Largura de um item
    container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

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

// Busca e clique para atualizar a divshow
const botão = document.querySelector('#submitbtn');
const autores = document.querySelectorAll('.musica-autor');
const musicas = document.querySelectorAll('.musica, .slides-musica');

// Função para atualizar a divshow
function updateDivShow(element) {
    const bgImage = window.getComputedStyle(element).backgroundImage;
    const newSrc = element.getAttribute('data-music');
    const titulo = element.querySelector('.musica-titulo')?.textContent || '';
    const autor = element.querySelector('.musica-autor')?.textContent || '';

    divShow.style.backgroundImage = bgImage;
    divShow.innerHTML = `<div class="titulo">${titulo}</div><div class="autor">${autor}</div>`;
    audioSource.src = newSrc;
    audio.load();
    audio.play();
}

// Evento de busca
botão.addEventListener("click", function (event) {
    event.preventDefault();
    const pesquisa = document.querySelector('#Pesquisar').value.toLowerCase();
    let encontrado = false;

    musicas.forEach(function (musicaElemento) {
        const titulo = musicaElemento.querySelector('.musica-titulo')?.textContent.toLowerCase() || '';
        const autor = musicaElemento.querySelector('.musica-autor')?.textContent.toLowerCase() || '';

        if (titulo.includes(pesquisa) || autor.includes(pesquisa)) {
            updateDivShow(musicaElemento);
            encontrado = true;
        }
    });

    if (!encontrado) {
        alert("Música ou autor não encontrado.");
    }
});

// Evento de clique nas músicas
musicas.forEach((musica) => {
    musica.addEventListener('click', () => updateDivShow(musica));
});
