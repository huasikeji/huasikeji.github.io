// 滑动主体
function goToMain() {
  window.scrollTo({
    top: document.documentElement.clientHeight,
    behavior: "smooth",
  });
}
// 夜间模式切换
function switchDarkMode() {
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#171717')
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff')

    }
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff')

    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#171717')
    }
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