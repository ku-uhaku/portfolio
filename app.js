//setup AOS
AOS.init();

// nav links effect

const nav_links = document.querySelectorAll("nav ul li a");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval;

nav_links.forEach((nav_link) => {
  nav_link.addEventListener("mouseover", (e) => {
    let i = 0;
    interval = setInterval(() => {
      e.target.innerText = e.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < i) {
            return e.target.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      if (i >= e.target.dataset.value.length) clearInterval(interval);
      i += 1 / 3;
    }, 30);
  });

  nav_link.addEventListener("mouseout", () => {
    clearInterval(interval);
    // Reset the text to its original value
    nav_link.innerText = nav_link.dataset.value;
  });
});

// auto typing effect

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};

//menu btn

const menuBtn = document.querySelector("header .mobile .menu-btn");
const menu = document.querySelector("header nav ul");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active-menu");
});

const textRounded = document.querySelector(".text-rounded");

textRounded.innerHTML = textRounded.innerText
  .split("")
  .map((char, i) => {
    return `<span style="transform:rotate(${i * 10}deg)">${char}</span>`;
  })
  .join("");

const circle = document.querySelector(".circle");

const rotateCircle = () => {
  circle.animate(
    [{ transform: `rotate(${0}deg)` }, { transform: `rotate(${360}deg)` }],
    {
      duration: 10000,
      iterations: Infinity,
    }
  );
};

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const projectEl = document.querySelector(".projects");
const allProject = document.querySelectorAll(".project");

const projectbox = document.querySelector(".container-project");

let i = 0;
const nextProject = () => {
  let projectWidth = projectbox.offsetWidth;
  if (i == allProject.length - 1) {
    i = 0;
    projectEl.style.transform = `translateX(-${i * projectWidth}px)`;
  } else {
    i++;
    projectEl.style.transform = `translateX(-${i * projectWidth}px)`;
  }
};
const prevProject = () => {
  let projectWidth = projectbox.offsetWidth;
  if (i == 0) {
    i = allProject.length - 1;
    projectEl.style.transform = `translateX(-${i * projectWidth}px)`;
  } else {
    i--;
    projectEl.style.transform = `translateX(-${i * projectWidth}px)`;
  }
};
nextBtn.addEventListener("click", () => {
  nextProject();
});
prevBtn.addEventListener("click", () => {
  prevProject();
});
setInterval(() => {
  nextProject();
  setTimeout(() => {}, 6000);
}, 6000);
