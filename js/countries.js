var params = window.getParams();

function getURL() {
  console.log("log. countries. call getURL()");
  var url =
    "./detail?type=" +
    params["type"] +
    "&country=" +
    params["country"] +
    "&locale=" +
    params["locale"];
  return url;
}

$(document).ready(function () {
  var countries = {};
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
  } else {
    countries = {
      AU: [{ country: "Australia", language: "English", locale: "en-AU" }],
      BR: [
        { country: "Brazil", language: "Português(Brasil)", locale: "pt-BR" },
      ],
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
      KR: [
        { country: "South Korea", language: "한국어", locale: "ko-KR" },
        { country: "South Korea", language: "English", locale: "en-US" },
      ],
      ES: [{ country: "Spain", language: "Español", locale: "es-ES" }],
      TW: [{ country: "Taiwan", language: "台灣中文", locale: "zh-TW" }],
      TH: [{ country: "Thailand", language: "ไทย", locale: "th-TH" }],
      GB: [{ country: "United Kingdom", language: "English", locale: "en-GB" }],
      US: [
        {
          country: "United States of America",
          language: "English",
          locale: "en-US",
        },
      ],
      VN: [{ country: "Vietnam", language: "Tiếng Việt", locale: "vi-VN" }],
    };
  }

  for (let countryCode in countries) {
    const list = document.getElementById("id_countrylist");
    for (let langInfo of countries[countryCode]) {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.innerText = langInfo.country + "/" + langInfo.language;
      link.onclick = function () {
        selectCountry(countryCode, langInfo.locale);
      };
      listItem.appendChild(link);
      list.appendChild(listItem);
    }
    document.body.appendChild(list);
  }

  console.log("log. test. inputIndexUrl list");
  const testUL = document.createElement("ul");
  for (let countryCode in countries) {
    for (let langInfo of countries[countryCode]) {
      //createList(langInfo, testUL, "index");
      testURL("index", countryCode, langInfo.locale);
    }
  }

  console.log("log. test. inputDetailUrl list");
  for (let countryCode in countries) {
    for (let langInfo of countries[countryCode]) {
      //createList(langInfo, testUL, "detail");
      testURL("detail", countryCode, langInfo.locale);
    }
  }
  document.body.appendChild(testUL);
});

function selectCountry(countryCode, locale) {
  const url = `./detail?type=${params["type"]}&country=${countryCode}&locale=${locale}`;
  location.href = url;
}

function createList(langInfo, testUL, pageName) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.innerText = langInfo.country + "/" + langInfo.language;
  link.onclick = function () {
    testURL(pageName, countryCode, langInfo.locale);
  };
  listItem.appendChild(link);
  testUL.appendChild(listItem);
}

function testURL(pageName, countryCode, locale) {
  var inputUrl = `https://lgapps.github.io/${pageName}?type=${params["type"]}&country=${countryCode}&locale=${locale}`;
  if (pageName === "detail") {
    var typeToLower = params["type"].toLowerCase();
    inputUrl = `https://lgapps.github.io/customer_${typeToLower}/${pageName}?type=${params["type"]}&country=${countryCode}&locale=${locale}`;
  }
  console.log(inputUrl);
}
