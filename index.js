var swiper = new Swiper(".mySwiper", {
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
});

let Form = document.querySelector("form")
let InpName = document.querySelector(".name__form")
let InpEmail = document.querySelector(".email__form")
let InpMessage = document.querySelector(".message__form")
Form.addEventListener("submit", (event) => {
  event.preventDefault()
  let message = `Заявка з сайту\n\nName: ${InpName.value}\nEmail: ${InpEmail.value}\nMessage: ${InpMessage.value}`
  sendData(message).then(() => {
    InpName.value = ""
    InpEmail.value = ""
    InpMessage.value = ""
  })

})

const _CHAT_ID = "-1002157501694"
const _TG_TOKEN_BOT = "7308608431:AAHVtxnC26iOo8id225Gj7TkIXGYJIAFABw"
const _TG_URL = `https://api.telegram.org/bot${_TG_TOKEN_BOT}/sendMessage`

async function sendData(message) {
  try {
    return await fetch(_TG_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: _CHAT_ID,
        text: message,
        parse_mode: "html"
      }),
    })
  } catch (error) {
    return error
  }
}



(function () {
    let style = document.createElement('style');
    style.innerHTML = ".unselect-language{display: none;}";
    document.getElementsByTagName('head')[0].appendChild(style);
    function setLanguage(currentLanguage) {
        let notCurrentTagNames = document.querySelectorAll("[data-lang]");
         notCurrentTagNames.forEach(function (tag) {
            if ( !tag.classList.contains("unselect-language")) {
                tag.classList.add("unselect-language");
            }
        });
        let currentTagNames = document.querySelectorAll(`[data-lang="${currentLanguage}"]`);
         currentTagNames.forEach(function (tag) {
            if ( tag.classList.contains("unselect-language")) {
                tag.classList.remove("unselect-language");
            }
        });
        let selectLanguage = document.getElementById("change-language");
        selectLanguage.value = currentLanguage;
    }
    function changeLanguage(){
        let selectLanguage = document.getElementById("change-language");
        let selectLang = selectLanguage.options[selectLanguage.selectedIndex].value;
        localStorage.setItem('lang',selectLang);
        setLanguage(selectLang);
    }
    function getLanguage(){
        let language = window.navigator.userLanguage || window.navigator.language;
        let lang = language.substr(0,2).toLowerCase();
        let localLang = null;
        try {
            localLang = localStorage.getItem('lang');
        } catch (e) {}
        if(localLang !== null) lang = localLang;
        let isExist = document.querySelectorAll(`[data-lang="${lang}"]`);
        if (isExist.length === 0) {
            lang = "en";
        }
        return lang;
    }
    document.getElementById("change-language").addEventListener("change", function (e) {
        changeLanguage();
    });
    try{
        setLanguage(getLanguage());
    }
    catch (e) {}
})();