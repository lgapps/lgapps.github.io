var params = window.getParams();
var countryList = window.getCountryList();

$(document).ready(function () {
  var countries = countryList;
  if (params["locale"] === "ko-KR") {
    countries = {
      NL: [{ country: "네덜란드", language: "Nederlands", locale: "nl-NL" }],
      TW: [{ country: "대만", language: "台灣中文", locale: "zh-TW" }],
      KR: [
        { country: "대한민국", language: "한국어", locale: "ko-KR" },
        { country: "대한민국", language: "영어", locale: "en-US" },
      ],
      DE: [{ country: "독일", language: "Deutsch", locale: "de-DE" }],
      US: [{ country: "미국", language: "English", locale: "en-US" }],
      VN: [{ country: "베트남", language: "Tiếng Việt", locale: "vi-VN" }],
      BR: [
        { country: "브라질", language: "Português(Brasil)", locale: "pt-BR" },
      ],
      ES: [{ country: "스페인", language: "Español", locale: "es-ES" }],
      SG: [{ country: "싱가폴", language: "English", locale: "en-SG" }],
      GB: [{ country: "영국", language: "English", locale: "en-GB" }],
      IT: [{ country: "이탈리아", language: "Italiano", locale: "it-IT" }],
      IN: [{ country: "인도", language: "English", locale: "en-IN" }],
      JP: [{ country: "일본", language: "日本語", locale: "ja-JP" }],
      CN: [{ country: "중국", language: "简体中文", locale: "zh-CN" }],
      CA: [
        { country: "캐나다", language: "English", locale: "en-US" },
        { country: "캐나다", language: "Francais", locale: "fr-CA" },
      ],
      TH: [{ country: "태국", language: "ไทย", locale: "th-TH" }],
      PT: [
        {
          country: "포르투갈",
          language: "Português(Portugal)",
          locale: "pt-PT",
        },
      ],
      PL: [{ country: "폴란드", language: "Polski", locale: "pl-PL" }],
      FR: [{ country: "프랑스", language: "Français", locale: "fr-FR" }],
      AU: [{ country: "호주", language: "English", locale: "en-AU" }],
    };
  }

  for (let countryCode in countries) {
    const list = document.getElementById("id_countrylist");
    for (let langInfo of countries[countryCode]) {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.innerText = langInfo.country + "/" + langInfo.language;
      link.onclick = function () {
        selectCountry(countryCode, langInfo.locale);
      };
      // link.setAttribute("role", "link");
      // link.setAttribute("aria-label", link.innerText);
      listItem.appendChild(link);
      list.appendChild(listItem);
    }
    document.body.appendChild(list);
  }
});

function selectCountry(countryCode, locale) {
  const url = `./detail?type=${params["type"]}&country=${countryCode}&locale=${locale}`;
  location.href = url;
}
