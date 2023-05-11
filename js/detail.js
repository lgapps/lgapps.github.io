var params = window.getParams();

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
      console.log("log. success.");

      var url_default = "./default_en-US.html";
      var findRecentFile = url_default;
      const options = [];
      const pathValue = "./" + params["country"] + "/" + params["locale"] + "/";
      if (data && data.length > 0) {
        console.log("log. data.length=" + data.length);
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

        var select = document.getElementById("files_list");
        var firstOptionValue = select.options[0].textContent;
        if (firstOptionValue) {
          findRecentFile = firstOptionValue + ".html";
          console.log("log. findRecentFile=" + findRecentFile);
        }
      }

      var recentUrl =
        "./" +
        params["country"] +
        "/" +
        params["locale"] +
        "/" +
        findRecentFile;
      $("#contents").load(recentUrl, function (response, status, xhr) {
        if (status == "error") {
          console.log("log. no file. load default page.");
          $("#contents_default").load(url_default);
          $("#select_files").hide();
        } else {
          console.log("log. file exists. status=", status);
        }
      });
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
