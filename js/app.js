const tabcontent = document.querySelectorAll(".tabcontent");
const tabheader = document.querySelectorAll(".tabheader__item");
const header = document.querySelector(".tabheader");

//Tabs
function hideContent() {
  tabheader.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
  tabcontent.forEach((item) => {
    item.classList.remove("active");
    item.classList.add("hide");
    item.classList.remove("animate");
  });
}

function activeContent(i = 0) {
  tabcontent[i].classList.add("animate");
  tabcontent[i].classList.remove("hide");
  tabcontent[i].classList.add("active");
  tabheader[i].classList.add("tabheader__item_active");
}

hideContent();
activeContent();

header.addEventListener("click", function (e) {
  const target = e.target;
  if (target && target.classList.contains("tabheader__item")) {
    tabheader.forEach((item, i) => {
      if (target == item) {
        hideContent();
        activeContent(i);
      }
    });
  }
});

//Modal

const modal = document.querySelector(".modal"),
  modalBtn = document.querySelectorAll("[data-modal]");

modalBtn.forEach((btn) => {
  btn.addEventListener("click", showModal);
});

modal.addEventListener("click", function (e) {
  if (e.target === modal || e.target.getAttribute("data-close") == "") {
    closeModal();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.code === "Escape") {
    closeModal();
  }
});

const timerID = setTimeout(function () {
  showModal();
}, 50000);

function showModal() {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  clearTimeout(timerID);
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

window.addEventListener("scroll", showModalScroll);

function showModalScroll() {
  if (
    window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    showModal();
    window.removeEventListener("scroll", showModalScroll);
  }
}

//Timer

const timer = document.querySelector(".timer");
const deadline = new Date(2023, 9, 22, 23, 59);

const timerSale = setInterval(createDate, 1000);
createDate();

function createDate() {
  let period = deadline - new Date();
  if (period > 0) {
    let days = Math.floor(period / (1000 * 60 * 60 * 24)),
      hours = Math.floor((period / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((period / (1000 * 60)) % 60),
      sec = Math.floor((period / 1000) % 60);
    addTime(days, hours, minutes, sec);
  } else {
    clearInterval(timerSale);
    addTime(0, 0, 0, 0);
  }
}
function addTime(days, hours, minutes, sec) {
  const daysTimer = document.querySelector("#days"),
    hoursTimer = document.querySelector("#hours"),
    minutesTimer = document.querySelector("#minutes"),
    secTimer = document.querySelector("#seconds");

  daysTimer.innerHTML = changeTime(days);
  hoursTimer.innerHTML = changeTime(hours);
  minutesTimer.innerHTML = changeTime(minutes);
  secTimer.innerHTML = changeTime(sec);
}

function changeTime(num) {
  return num < 10 ? `0${num}` : num;
}
//Create elements

const data = [
  {
    menu: 'Меню "Фитнес"',
    paragraph:
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    price: 229,
    img: "img/tabs/vegy.jpg",
    alt: "fintess",
  },
  {
    menu: "Меню “Премиум”",
    paragraph:
      "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    price: 550,
    img: "img/tabs/elite.jpg",
    alt: "premium",
  },
  {
    menu: 'Меню "Постное"',
    paragraph:
      "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    price: 430,
    img: "img/tabs/post.jpg",
    alt: "post",
  },
];

class MenuElement {
  constructor(parent, { title, descr, price, img, altimg }, ...classes) {
    this.img = img;
    this.altimg = altimg;
    this.title = title;
    this.descr = descr;
    this.altimg = altimg;
    this.parent = document.querySelector(parent);
    this.price = price;
    this.classes = classes;
  }
  render() {
    let div = document.createElement("div");
    this.classes.length === 0
      ? "menu__item"
      : this.classes.forEach((className) => div.classList.add(className));
    div.innerHTML = `
        <img src=${this.img} alt=${this.altimg} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total">
            <span>${this.price}</span> грн/день
          </div>
        </div>
    `;
    this.parent.append(div);
  }
}

fetch("http://localhost:3000/menu")
  .then((data) => data.json())
  .then((res) => {
    res.forEach((el) => {
      return new MenuElement(
        ".menu__field .container",
        el,
        "menu__item"
      ).render();
    });
  });

//Forms

const forms = document.querySelectorAll("form");

forms.forEach((form) => postData(form));

const message = {
  loading: "Загрузка",
  success: "Спасибо! Скоро мы с вами свяжемся",
  fail: "Что-то пошло не так...",
};

function postData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const div = document.createElement("div");
    form.append(div);
    div.textContent = message.loading;

    const formData = new FormData(form);
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });

    fetch("js/server.php", {
      method: "POST",
      headers: {
        "Content-type": "json/application",
      },
      body: JSON.stringify(obj),
    })
      .then((data) => data.text())
      .then((data) => {
        successModal(message.success);
        div.remove();
        form.reset();
      })
      .catch(() => {
        successModal(message.fail);
      })
      .finally(() => {
        form.reset();
      });
  });
}

function successModal(text) {
  const dialog = document.querySelector(".modal__dialog");

  dialog.classList.add("hide");

  modal.classList.add("active");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  clearInterval(timerID);

  const thanksModal = document.createElement("div");
  thanksModal.classList.add("modal__dialog");
  thanksModal.innerHTML = `  
  <div class="modal__content">
  <div class="modal__close" data-close>×</div>
  <div class="modal__title">${text}</div>
</div>
`;
  console.log("Проверка");
  document.querySelector(".modal").append(thanksModal);
}

const slides = document.querySelectorAll(".offer__slide"),
  prev = document.querySelector(".offer__slider-prev"),
  next = document.querySelector(".offer__slider-next"),
  total = document.querySelector("#total"),
  current = document.querySelector("#current");

prev.addEventListener("click", () => changeSlide(-1));
next.addEventListener("click", () => changeSlide(1));

let slideIndex = 1;

showSlide(slideIndex);

function changeSlide(n) {
  showSlide((slideIndex += n));
}

function showSlide(n) {
  total.textContent = `0${slides.length}`;
  if (n < 1) {
    slideIndex = slides.length;
  }
  if (n > slides.length) {
    slideIndex = 1;
  }
  slides.forEach((slide) => {
    slide.style.display = "none";
  });
  slides[slideIndex - 1].style.display = "block";
  slideIndex < 10
    ? (current.textContent = `0${slideIndex}`)
    : (current.textContent = slideIndex);
}

//Calculate
const calculatingChoose = document.querySelectorAll(".calculating__choose div");
const result = document.querySelector(".calculating__result span");
let gender = localStorage.getItem("gender") || "female",
  activity = localStorage.getItem("activity") || 1.375,
  height = localStorage.getItem("height") || "",
  weight = localStorage.getItem("weight") || "",
  age = localStorage.getItem("age") || "";

function updateInfo(selector, activeClass, variable) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => el.classList.remove(activeClass));
  const result = elements.forEach((el) => {
    if (el.getAttribute(selector.slice(1, -1)) == variable) {
      el.classList.add(activeClass);
    }
  });
}

function setDinamicInfo(height, weight, age) {
  console.log(height, weight, age);
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    switch (input.getAttribute("id")) {
      case "height":
        input.value = height;
        console.log(input.value);
        break;
      case "weight":
        input.value = weight;
        break;

      case "age":
        input.value = age;
        break;
    }
  });
}

setDinamicInfo(height, weight, age);
updateInfo("[data-gender]", "calculating__choose-item_active", gender);

updateInfo("[data-activity]", "calculating__choose-item_active", activity);

function calculateCalories() {
  let calories;
  if (!activity || !gender || !weight || !age || !height) {
    calories = "";
  } else {
    if (gender == "female") {
      calories = Math.floor(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity
      );
    } else {
      calories = Math.floor(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity
      );
    }
  }
  result.textContent = calories;
}

calculateCalories();

function selectOptions(classes, activeClasses) {
  const elements = document.querySelectorAll(classes);
  elements.forEach((element) => {
    element.addEventListener("click", function (e) {
      elements.forEach((el) => el.classList.remove(activeClasses));
      e.target.classList.add(activeClasses);
      if (e.target.getAttribute("data-activity")) {
        activity = +e.target.getAttribute("data-activity");
        localStorage.setItem("activity", activity);
      } else {
        gender = e.target.getAttribute("data-gender");
        localStorage.setItem("gender", gender);
      }
      console.log(activity);
      calculateCalories();
    });
  });
}

selectOptions(
  ".calculating__choose_big div",
  "calculating__choose-item_active"
);

selectOptions("#gender div", "calculating__choose-item_active");

function getDinamicInfo() {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) =>
    input.addEventListener("input", function (e) {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
        switch (input.getAttribute("id")) {
          case "height":
            height = +input.value;
            localStorage.setItem("height", height);
            break;
          case "weight":
            weight = +input.value;
            localStorage.setItem("weight", weight);

            break;
          case "age":
            age = +input.value;
            localStorage.setItem("age", age);

            break;
        }
      }
      calculateCalories();
    })
  );
}

getDinamicInfo();
