
function setPageBackgroundColor(text,color) {
  document.querySelector(".header-menu").style.backgroundColor = color
  document.querySelectorAll("a.menu-item-link").forEach(element => {
    element.style.color = text
  });
}


function colectColor(){
 let color = document.querySelector("#color-input").value
 let text = "#ffffff"
 if (luminosity(color)>190){
   text = "#000000"
 }
 return {
   text,
   color
 }
}


  document.querySelector('#color-input').addEventListener('input',  async()=> {
    document.querySelector("#pseudo-color-input").style.backgroundColor = document.querySelector("#color-input").value
    let {text, color} = colectColor()
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
        args:[text,color]
      });
    });





function luminosity(hex) {
  let r, g, b, longo;
  hex = hex.replace( '#', '' );
  longo = hex.length > 3;

  r = longo ? parseInt(hex.substr(0, 2), 16) : parseInt(hex.substr(0, 1), 16) * 17;
  g = longo ? parseInt(hex.substr(2, 2), 16) : parseInt(hex.substr(1, 1), 16) * 17;
  b = longo ? parseInt(hex.substr(4, 2), 16) : parseInt(hex.substr(2, 1), 16) * 17;

  return ( r * 299 + g * 587 + b * 114) / 1000;
}
