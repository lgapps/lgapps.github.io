var params = window.getParams();
var countryList = window.getCountryList();

$(document).ready(function () {
  console.log("log. setButtonBackValue.");
  setButtonBackValue();

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
      Accept: "application/vnd.github+json",
    },
  })
    .done(function (data) {
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
    })
    .fail(function (xhr, status, error) {
      console.log("log. no file. load default page.");
      var url_default = "./default_en-US.html";
      $("#contents_default").load(url_default);
      $("#select_files").hide();
    });
});

function setButtonBackValue() {
  var countryNLang = findCountryNLang(params["locale"], params["country"]);
  if (countryNLang) {
    $("#buttonBack").text(countryNLang.country + "/" + countryNLang.language);
    console.log(countryNLang.country + "/" + countryNLang.language);
  } else {
    $("#buttonBack").text("Back");
    console.log("No information. show Back.");
  }
}

function findCountryNLang(locale, country) {
  var countries = countryList[country];
  if (countries) {
    for (var i = 0; i < countries.length; i++) {
      var currentCountry = countries[i];

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
