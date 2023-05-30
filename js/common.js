function getParams() {
  var url = window.location.search.replace("?", "");
  var params = {};
  var urlArray = url.split("&");

  for (var i in urlArray) {
    var param = urlArray[i].split("=");
    params[param[0]] = param[1];
  }
  console.log("log. detail. url=" + url);
  console.log("log. params=" + params);
  return params;
}

function getCountryList() {
  countries = {
    AU: [{ country: "Australia", language: "English", locale: "en-AU" }],
    BR: [{ country: "Brazil", language: "Português(Brasil)", locale: "pt-BR" }],
    CA: [
      { country: "Canada", language: "English", locale: "en-US" },
      { country: "Canada", language: "Francais", locale: "fr-CA" },
    ],
    CN: [{ country: "China", language: "简体中文", locale: "zh-CN" }],
    FR: [{ country: "France", language: "Français", locale: "fr-FR" }],
    DE: [{ country: "Germany", language: "Deutsch", locale: "de-DE" }],
    IN: [{ country: "India", language: "English", locale: "en-IN" }],
    IT: [{ country: "Italy", language: "Italiano", locale: "it-IT" }],
    JP: [{ country: "Japan", language: "日本語", locale: "ja-JP" }],
    KR: [
      { country: "Korea", language: "한국어", locale: "ko-KR" },
      { country: "Korea", language: "English", locale: "en-US" },
    ],
    NL: [{ country: "Netherlands", language: "Nederlands", locale: "nl-NL" }],
    PL: [{ country: "Poland", language: "Polski", locale: "pl-PL" }],
    PT: [
      {
        country: "Portugal",
        language: "Português(Portugal)",
        locale: "pt-PT",
      },
    ],
    SG: [{ country: "Singapore", language: "English", locale: "en-SG" }],
    ES: [{ country: "Spain", language: "Español", locale: "es-ES" }],
    TW: [{ country: "Taiwan", language: "台灣中文", locale: "zh-TW" }],
    TH: [{ country: "Thailand", language: "ไทย", locale: "th-TH" }],
    US: [{ country: "U.S.A", language: "English", locale: "en-US" }],
    GB: [{ country: "United Kingdom", language: "English", locale: "en-GB" }],

    VN: [{ country: "Vietnam", language: "Tiếng Việt", locale: "vi-VN" }],
  };
  return countries;
}

window.getParams = getParams;
window.getCountryList = getCountryList;
