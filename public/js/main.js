// 滑动主体
function goToMain() {
  window.scrollTo({
    top: document.documentElement.clientHeight,
    behavior: "smooth",
  });
}
// 夜间模式切换
function switchDarkMode() {
  function setThemeColor(color) {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
  }
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
      setThemeColor('#171717');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
      setThemeColor('#ffffff');
    }
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
      setThemeColor('#ffffff');
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
      setThemeColor('#171717');
    }
  }
}

document.onkeydown=function(e){
  if (e.ctrlKey && e.altKey){
    switchDarkMode();
  }
}


// 生成二维码
var link = document.querySelectorAll("[data-qrcode-link]");
var qrcodeImg = document.querySelectorAll("[data-qrcode-img]");
for (let i = 0; i < link.length; i++) {
  new AwesomeQR.AwesomeQR({
    text: link[i].getAttribute("data-qrcode-link"), // 内容
    // size: 256, // 二维码大小
    margin: 12, // 二维码白边大小
  }).draw()
    .then((dataURL) => {
      qrcodeImg[i].setAttribute("src", dataURL)
    })
    .catch((err) => {
      console.error(err);
    });
}
// 下载名片
var download = document.querySelectorAll(".download");
var card = document.querySelectorAll(".card");
for (let i = 0; i < download.length; i++) {
  download[i].addEventListener("click", function() {
    html2canvas(card[i]).then((canvas) => {
      canvas.toBlob((blob) => {
        const href = window.URL.createObjectURL(new Blob([blob]));
        const link2 = document.createElement("a");
        const name = document.querySelectorAll(".name")[i].innerText;
        link2.href = href;
        link2.download = name + "\u7684\u540D\u7247.png";
        document.body.appendChild(link2);
        link2.click();
        document.body.removeChild(link2);
      }, "image/png");
    });
  }, false);
}