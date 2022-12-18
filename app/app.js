let menuBtn = document.querySelector(".menu-bars i");
let closeBtn = document.querySelector(".close-X i");
let emptyNav = document.querySelector(".nav-bar .empty-aside");
let menuList = document.querySelector(".nav-bar .menu");
let nav = document.querySelector(".nav");
let all = document.querySelector(".all");
let navItems = document.querySelectorAll(".menu .nav-menu nav > ul li");
let socialMedias = document.querySelectorAll(".social-media > nav > ul li");
let copyrytes = document.querySelectorAll(".copyryte");
let rightSide = document.querySelector(".right");
let leftSide = document.querySelector(".left");

//function to show menu
menuBtn.addEventListener("click", (e) => {
  nav.style.zIndex = "10000";
  nav.style.display = "block";
  emptyNav.style.zIndex = "100000";
  leftSide.style.zIndex = "-100000";
  emptyNav.style.width = leftSide.offsetWidth + "px";
  emptyNav.style.transform = "translate(0%)";
  menuList.style.width = rightSide.offsetWidth + "px";
  menuList.style.transform = "translate(0%)";
  document.body.style.overflow = "hidden";
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].classList.add(`xd${i}`);
  }
  socialMedias.forEach((socialMedia) => {
    socialMedia.classList.add("social");
  });
  copyrytes.forEach(copyryte=>{
      copyryte.classList.add("copyryte-animation");
  })
})
//function to hide menu
closeBtn.addEventListener("click", (e) => {
  setTimeout(() => {
    nav.style.zIndex = "-10000";
    leftSide.style.zIndex = "10000";
    nav.style.display = "none";
  }, 400);
  
  emptyNav.style.transform = "translate(-100%)";
  menuList.style.transform = "translate(110%)";
  document.body.style.overflow = "auto";
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].classList.remove(`xd${i}`);
  }
  socialMedias.forEach((socialMedia) => {
    socialMedia.classList.remove("social");
  });
  copyrytes.forEach(copyryte=>{
      copyryte.classList.remove("copyryte-animation");
  })
})


// menuBtns.forEach((menuBtn) => {
//   menuBtn.addEventListener("click", (e) => {
  
//     nav.style.zIndex = "10000";
    
//     leftSide.style.zIndex = "0"
//     emptyNavs.forEach((emptyNav) => {
//       emptyNav.style.width = leftSide.offsetWidth + "px";
//       emptyNav.style.transform = "translate(0%)";
//     });
//     menuLists.forEach((menuList) => {
//       menuList.style.width = rightSide.offsetWidth + "px";
//       menuList.style.transform = "translate(-0%)";
//     });
//     document.body.style.overflow = "hidden";

//     for (let i = 0; i < navItems.length; i++) {
//       navItems[i].classList.add(`xd${i}`);
//     }
//     socialMedias.forEach((socialMedia) => {
//       socialMedia.classList.add("social");
//     });
//     copyrytes.forEach(copyryte=>{
//         copyryte.classList.add("copyryte-animation");
//     })
//   });
// });
// closeBtns.forEach((closeBtn) => {

//   closeBtn.addEventListener("click", (e) => {
//     setTimeout(() => {
//       nav.style.zIndex = "-10000";
//       leftSide.style.zIndex = "10000"
//     }, 1000);
    
//     document.body.style.overflow = "auto";
//     emptyNavs.forEach((emptyNav) => {
//       emptyNav.style.transform = "translate(-100%)";
//     });
//     menuLists.forEach((menuList) => {

//       menuList.style.transform = "translate(110%)";
//     });
//     for (let i = 0; i < navItems.length; i++) {
//       navItems[i].classList.remove(`xd${i}`);
//     }
//     socialMedias.forEach((socialMedia) => {
//       socialMedia.classList.remove("social");
//     });
//     copyrytes.forEach(copyryte=>{
//         copyryte.classList.remove("copyryte-animation");
//     })
//   });
// });



//scorlling

window.addEventListener("scroll", () => {


  if (window.scrollY == 0) {
    rightSide.style.width = "40%";
    leftSide.style.width = "60%";
    rightSide.classList.remove("scrolled");
  }else{
    rightSide.style.width = "30%";
    leftSide.style.width = "70%";
    rightSide.classList.add("scrolled");
  }
});

//////////////////////////////////:

let experienceBtn = document.querySelector(".experience");
let experienceEl = document.querySelector(".experiences-cards");
let educationBtn = document.querySelector(".education");
let educationEl = document.querySelector(".education-cards");
let skillsBtn = document.querySelector(".skills");
let skillsEL = document.querySelector(".hardSkills");

let showExperience = document.querySelector(".show-experiences");
let showEducation = document.querySelector(".show-education");
let showSkills = document.querySelector(".show-skills");
let moving = document.querySelectorAll(".line-move");
let movingNum = document.querySelectorAll(".line-number");

experienceBtn.addEventListener("click", () => {
  showEducation.classList.add("hide");
  showSkills.classList.add("hide");
  showExperience.classList.remove("hide");
  experienceBtn.classList.add("show-active");
  educationBtn.classList.remove("show-active");
  skillsBtn.classList.remove("show-active");
  experienceEl.classList.add("animationEx");
  educationEl.classList.remove("animationEx");
  skillsEL.classList.remove("animationEx");
});

educationBtn.addEventListener("click", () => {
  showExperience.classList.add("hide");
  showSkills.classList.add("hide");
  showEducation.classList.remove("hide");
  educationBtn.classList.add("show-active");
  experienceBtn.classList.remove("show-active");
  skillsBtn.classList.remove("show-active");
  educationEl.classList.add("animationEx");
  experienceEl.classList.remove("animationEx");
  skillsEL.classList.remove("animationEx");
});

skillsBtn.addEventListener("click", () => {
  showEducation.classList.add("hide");
  showExperience.classList.add("hide");
  showSkills.classList.remove("hide");
  skillsBtn.classList.add("show-active");
  experienceBtn.classList.remove("show-active");
  educationBtn.classList.remove("show-active");
  skillsEL.classList.add("animationEx");
  experienceEl.classList.remove("animationEx");
  educationEl.classList.remove("animationEx");
  moving.forEach((move) => {
    move.classList.add("move");
  });
  movingNum.forEach((moveNum) => {
    moveNum.classList.add("moveNum");
  });
});
////////////////////////////////////

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

let imgRandom;
const quotes = document.querySelector(".qoutes");
const getApiQuotes = async (i) => {
  const responce = await fetch(
    "https://api.quotable.io/random?minLength=50&maxLength=100"
  );
  const data = await responce.json();
  let div = document.createElement("div");
  div.classList.add("card-coute");
  let imgDiv = document.createElement("div");
  imgDiv.classList.add("img-coute");
  let imgCoute = document.createElement("img");
  imgCoute.src = `https://picsum.photos/380/280?random=${i}`;
  imgCoute.alt = "img";
  imgDiv.appendChild(imgCoute);
  let contenuDiv = document.createElement("div");
  let p = document.createElement("p");
  contenuDiv.appendChild(p);
  contenuDiv.classList.add("contenu-coute");
  p.textContent = data.content;
  quotes.appendChild(div);
  div.appendChild(imgDiv);
  div.appendChild(contenuDiv);
};

for (let i = 1; i < 7; i++) {
  getApiQuotes(i);
}

const footerBtn = document.querySelector("footer i");

footerBtn.addEventListener("click", () => {
  window.scrollTo(1, 0);
});

const sendEmailBtn = document.querySelector(".btn-send-message");
const nameEl = document.querySelector(".name");
const emailEl = document.querySelector(".email");
const textAreaEl = document.querySelector(".message");
const telEl = document.querySelector(".tel");

const sections = document.querySelectorAll(
  ".container-section:not(:first-child)"
);

window.addEventListener("scroll", () => {
  const triggerSection = (window.innerHeight / 5) * 3;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerSection) {
      section.classList.add("show-section");
    } else {
      section.classList.remove("show-section");
    }
  });
});

// const mobileMode = document.querySelector(".mobile-mode");

// if (window.innerWidth < 1024) {
//   console.log("ok");
//   rightSide.style.display = "none";
//   mobileMode.classList.remove("hide");

//   leftSide.classList.add("fullWidth");
// } else {
//   mobileMode.classList.add("hide");
//   rightSide.style.display = "block";
// }

const age = document.querySelector(".age");
//function get age when you born
const getAge = (dateString) => {
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
age.textContent = getAge("2000-03-05");

console.log("%cHHHH sir ***** we dont do that here","color: red; font-size: 20px");



