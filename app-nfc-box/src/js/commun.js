import { conf } from "./conf.js"

document.getElementById('associernav').href = conf.urls.LIST
document.getElementById('ajouternav').href = conf.urls.ADD

document.getElementById('openbtn').addEventListener("click", () => {
  document.getElementById("mySidenav").style.width = "100%";
})

document.getElementById('closebtn').addEventListener("click", () => {
  document.getElementById("mySidenav").style.width = "0";
})


document.getElementById("logo").addEventListener("click", () => {
  window.location.replace("/")
})