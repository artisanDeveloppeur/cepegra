const focusableSelector = "button, a, input, textarea";
let modal = null, focusables = [], previouslyFocusedElement = null;
const openModal = async function (e) {
  e.preventDefault();
  const o = e.target.getAttribute("href");
  modal = o.startsWith("#") ? document.querySelector(o) : await loadModal(o),
    focusables = Array.from(modal.querySelectorAll(focusableSelector)),
    previouslyFocusedElement = document.querySelector(":focus"),
    modal.style.display = null, focusables[0].focus(),
    modal.removeAttribute("aria-hidden"),
    modal.setAttribute("aria-modal", "true"),

    modal.addEventListener("click", closeModal),
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal),
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)

},

  closeModal = function (e) {
    if (null === modal) return;
    null !== previouslyFocusedElement && previouslyFocusedElement.focus(),
      e.preventDefault(),
      modal.setAttribute("aria-hidden", "true"),
      modal.removeAttribute("aria-modal"),

      modal.removeEventListener("click", closeModal),
      modal.querySelector(".js-modal-close").removeEventListener("click", closeModal),
      modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);

    const o = function () {
      modal.style.display = "none", modal.removeEventListener("animationend", o), modal = null
    };

    modal.addEventListener("animationend", o)
  },

  stopPropagation = function (e) { e.stopPropagation() },

  focusInModal = function (e) {
    e.preventDefault();
    let o = focusables.findIndex(e => e === modal.querySelector(":focus"));
    !0 === e.shiftKey ? o-- : o++, o >= focusables.length && (o = 0),
      o < 0 && (o = focusables.length - 1), focusables[o].focus()
  },
  loadModal = async function (e) {
    const o = "#" + e.split("#")[1],
      t = document.querySelector(o);
    if (null !== t) return t;
    const l = await fetch(e).then(e => e.text()),
      a = document.createRange().createContextualFragment(l).querySelector(o);
    if (null === a) throw `L'élément ${o} n'a pas été trouvé dans la page ${e}`;
    return document.body.append(a), a
  };

document.querySelectorAll(".js-modal").forEach(e => {
  e.addEventListener("click", openModal)
}),

  window.addEventListener("keydown", function (e) {
    "Escape" !== e.key && "Esc" !== e.key || closeModal(e),
      "Tab" === e.key && null !== modal && focusInModal(e)
  });
