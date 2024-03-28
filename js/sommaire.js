
class Sommaire {
  constructor(container) {
    this.container = container; // Container dans lequel se trouve notre texte
    this.uls = [document.createElement('ul')]; // On stock les <ul> dans lequel on va placer nos <li>
    this.buildStructure();

  }
  // Permet de construire la structure de notre sommaire
  buildStructure() {
    let titles = this.container.querySelectorAll('.titlesommaire h2:not(.typo), .titlesommaire h3:not(.typo), .title h4, .title h5');
    for (let i = 0; i < titles.length; i++) {
      let title = titles[i];
      let lvl = parseInt(title.tagName.replace('H', '')) - 1;

      let li = document.createElement('li');
      let a = document.createElement('a');
      //console.log(titles[i].dataset.titre);
      //console.log(titles[i].id);

      //a.setAttribute('href', '#'+titles[i].dataset.titre);
      a.setAttribute('href', '#' + titles[i].id);

      a.textContent = title.textContent;
      li.appendChild(a);

      //sommaire.appendChild(li) remove 
      if (!this.uls[lvl - 1]) {
        let ul = document.createElement('ul');
        this.uls[lvl - 1] = ul;
        this.uls[lvl - 2].lastChild.appendChild(ul);
      }

      this.uls[lvl] = null;
      this.uls[lvl - 1].appendChild(li);
      this.bindScroll(a, title);


    }

  }
  bindScroll(anchor, title) {
    anchor.addEventListener('click', function (e) {
      //console.log("bindScroll")
      //e.preventDefault();
      document.body.scrollTop = title.offsetTop;

    });
  }
  appendTo(element) {
    element.appendChild(this.uls[0]);
  }
}
;
// Exemple d'utilisation
let s = new Sommaire(document.querySelector('.containerSommaire'));
s.appendTo(document.querySelector('#sommaire'));
