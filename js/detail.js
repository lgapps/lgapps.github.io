var params = window.getParams();
var countryList = window.getCountryList();

function getURL() {
  console.log("log. detail. call getURL()");
  var url =
    "./countries?type=" +
    params["type"] +
    "&country=" +
    params["country"] +
    "&locale=" +
    params["locale"];
  return url;
}

function getURL2() {
  console.log("log. detail. call getURL2()");
  var locale = params["locale"];
  var countries = params["country"];

  var countryLanguage = findCountryLanguage(locale, countries);
  if (countryLanguage) {
    var country = countryLanguage.country;
    var language = countryLanguage.language;

    var displayText = country + "/" + language;
    var buttonBack = document.getElementById("buttonBack");
    buttonBack.value = displayText;
    console.log(countryName + "/" + language);
  } else {
    document.getElementById("countryLanguage").textContent = "Back";
    console.log("No information. show Back.");
  }

  var url =
    "./countries?type=" +
    params["type"] +
    "&country=" +
    params["country"] +
    "&locale=" +
    params["locale"];
  return url;
}

function findCountryLanguage(locale, country) {
  var countries = countryList;
  var countriesList = countries[country];

  if (countriesList) {
    for (var i = 0; i < countriesList.length; i++) {
      var currentCountry = countriesList[i];

      if (currentCountry.locale === locale) {
        return {
          country: currentCountry.country,
          language: currentCountry.language,
        };
      }
    }
  }

  return null;
}

$(document).ready(function () {
  const owner = "lgapps";
  const repo = "lgapps.github.io";
  var typeToLower = params["type"].toLowerCase();
  const path =
    "customer_" +
    typeToLower +
    "/" +
    params["country"] +
    "/" +
    params["locale"];
  $.ajax({
    url: `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
    success: function (data) {
      console.log("log. success. data.length=" + data.length);
      const options = [];
      const pathValue = "./" + params["country"] + "/" + params["locale"] + "/";
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "file") {
          options.push(
            `<option value="${pathValue}${data[i].name}">${data[
              i
            ].name.substring(0, 6)}</option>`
          );
          // if (data[i].name.includes("recent.html")) {
          //   findRecentFile = data[i].name;
          //   console.log("log. findRecentFile=" + findRecentFile);
          // }
          console.log("log. data[i].name=" + data[i].name);
        }
      }

      options.sort(function (a, b) {
        if (a < b) {
          return 1;
        }
        if (a > b) {
          return -1;
        }
        return 0;
      });
      $("#files_list").html(options.join(""));

      var url_default = "./default_en-US.html";
      var findRecentFile = url_default;
      var select = document.getElementById("files_list");
      var firstOptionValue = select.options[0].textContent;
      if (firstOptionValue) {
        findRecentFile = firstOptionValue + ".html";
        console.log("log. findRecentFile=" + findRecentFile);
      }

      var recentUrl =
        "./" +
        params["country"] +
        "/" +
        params["locale"] +
        "/" +
        findRecentFile;
      $("#contents").load(recentUrl);
    },
    error: function (xhr, status, error) {
      console.log("log. no file. load default page.");
      var url_default = "./default_en-US.html";
      $("#contents_default").load(url_default);
      $("#select_files").hide();
    },
  });
});

function selectFile(select) {
  const contents = document.getElementById("contents");
  const fileName = select.value;
  console.log("log. fileName=" + fileName);
  fetch(fileName)
    .then((response) => response.text())
    .then((data) => {
      contents.innerHTML = data;
    })
    .catch((error) => console.log(error));
}
