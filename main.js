var ultimaVisita;
const diaHoje = new Date().getDate();
console.log(diaHoje);
var allcards;
const mesHoje = new Date().getMonth() + 1;
const ano = new Date().getFullYear()
const dataCompleta = `${diaHoje}-${mesHoje}-${ano}`
console.log(dataCompleta)

if (!localStorage.getItem("allCards")) {
  allcards = [];
  localStorage.setItem("allCards", JSON.stringify(allcards));
}
allcards = JSON.parse(localStorage.getItem("allCards"));
console.log(allcards);

if (localStorage.getItem("ultimaVisita")) {
  console.log("certoss");
  console.log(localStorage.getItem("ultimaVisita") * 1);
  ultimaVisita = localStorage.getItem("ultimaVisita") * 1;
}

function getInfo(n) {
  fetch("https://protected-taiga-89091.herokuapp.com/api/card")
    .then((res) => res.json())
    .then((data) => {
      data = data.data;
      console.log(data[n]);
      console.log(data[n].englishName);
      document.querySelector(".nome").innerText = data[n].englishName;
      document.querySelector(".img").src = data[n].sakuraCard;
      cardObject(data[n].englishName, data[n].sakuraCard, dataCompleta);
    })
    .catch((err) => console.log(err));
}

const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  if (ultimaVisita !== diaHoje) {
    btn.style.display = "none";
    console.log("ok");
    var randNum = Math.floor(Math.random() * 54);
    getInfo(randNum);
    ultimaVisita = diaHoje;
    localStorage.setItem("ultimaVisita", ultimaVisita);
    document.querySelector(".meaning").innerText =
      "You revealed your card today! Come back tomorrow.";
  } else {
    var lastcard;
    if (localStorage.getItem("lastCard")) {
      lastcard = JSON.parse(localStorage.getItem("lastCard"));
    }

    btn.style.display = "none";
    document.querySelector(".meaning").innerText =
      "You revealed your card today! Come back tomorrow.";
    document.querySelector(".nome").innerText = lastcard.name;
    document.querySelector(".img").src = lastcard.img;
  }
});

function cardObject(name, img, date) {
  let card = {};
  card.name = name;
  card.img = img;
  card.date = date;
  localStorage.setItem("lastCard", JSON.stringify(card));
  allcards.push(card);
  localStorage.setItem("allCards", JSON.stringify(allcards));
}

if (ultimaVisita * 1 === diaHoje) {
  var lastcard;
  if (localStorage.getItem("lastCard")) {
    lastcard = JSON.parse(localStorage.getItem("lastCard"));
  }

  btn.style.display = "none";
  document.querySelector(".meaning").innerText =
    "You revealed your card today! Come back tomorrow.";
  document.querySelector(".nome").innerText = lastcard.name;
  document.querySelector(".img").src = lastcard.img;
}
