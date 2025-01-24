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