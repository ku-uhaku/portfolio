let menuBtn = document.querySelector('.menu-bars img')
let closeBtn = document.querySelector('.close-X img')

let emptyNav = document.querySelector('.nav-bar .empty-aside')
let menuList = document.querySelector('.nav-bar .menu')
let all = document.querySelector('.all')
let navItems = document.querySelectorAll('.menu .nav-menu nav > ul li')
let socialMedias = document.querySelectorAll('.social-media > nav > ul li')
let copyryte = document.querySelector(".copyryte")



let rightSide = document.querySelector('.right')
let leftSide = document.querySelector('.left')

menuBtn.addEventListener('click' ,(e)=>{
    emptyNav.style.flex = "12"
    menuList.style.flex = "6"
    emptyNav.style.transform = "translate(0%)"
    menuList.style.transform = "translate(-0%)"
    menuList.parentElement.parentElement.style.zIndex = "1"
    for(let i = 0 ; i<navItems.length ; i++){
        navItems[i].classList.add(`xd${i}`)
    }
    socialMedias.forEach(socialMedia => {
        socialMedia.classList.add('social')
    });
    copyryte.classList.add("copyryte-animation")
  

    
   

})
closeBtn.addEventListener('click' ,(e)=>{


    emptyNav.style.transform = "translate(-100%)"
    menuList.style.transform = "translate(100%)"
    
    menuList.parentElement.parentElement.style.zIndex = "-1"
    for(let i = 0 ; i<navItems.length ; i++){
        navItems[i].classList.remove(`xd${i}`)
    }
    socialMedias.forEach(socialMedia => {
        socialMedia.classList.remove('social')
    });
    copyryte.classList.remove("copyryte-animation")
    // copyryte.style.opacity = "0"
})

window.addEventListener('scroll',()=>{
    rightSide.style.width = "30%"
    leftSide.style.width = "70%"
    rightSide.classList.add("scrolled")
    
   

    if(window.scrollY == 0 ){
        rightSide.style.width = "40%"
        leftSide.style.width = "60%"
        rightSide.classList.remove("scrolled")
        menuBtn.addEventListener('click' ,(e)=>{
            emptyNav.style.flex = "12"
            menuList.style.flex = "6"
            emptyNav.style.transform = "translate(0%)"
            menuList.style.transform = "translate(-0%)"
            menuList.parentElement.parentElement.style.zIndex = "1"
           
        
        })
        closeBtn.addEventListener('click' ,(e)=>{
   
        
            emptyNav.style.transform = "translate(-100%)"
            menuList.style.transform = "translate(100%)"
            
            menuList.parentElement.parentElement.style.zIndex = "-1"
            

        
        })

    }else{
        menuBtn.addEventListener('click' ,(e)=>{
            emptyNav.style.flex = "16"
            menuList.style.flex = "5"
            emptyNav.style.transform = "translate(0%)"
            menuList.style.transform = "translate(-0%)"
            menuList.parentElement.parentElement.style.zIndex = "1"
            
           

        
        })
        closeBtn.addEventListener('click' ,(e)=>{
           
            emptyNav.style.transform = "translate(-100%)"
            menuList.style.transform = "translate(100%)"
            
            menuList.parentElement.parentElement.style.zIndex = "-1"
           

        
        })
    }
})



//////////////////////////////////:


let experienceBtn = document.querySelector('.experience')
let experienceEl = document.querySelector('.experiences-cards')
let educationBtn = document.querySelector('.education')
let educationEl = document.querySelector('.education-cards')
let skillsBtn = document.querySelector('.skills')
let skillsEL = document.querySelector('.hardSkills')


let showExperience = document.querySelector('.show-experiences')
let showEducation = document.querySelector('.show-education')
let showSkills = document.querySelector('.show-skills')
let moving = document.querySelectorAll('.line-move')
let movingNum = document.querySelectorAll('.line-number')



experienceBtn.addEventListener('click',()=>{
    showEducation.classList.add('hide')
    showSkills.classList.add('hide')
    showExperience.classList.remove('hide')
    experienceBtn.classList.add('show-active')
    educationBtn.classList.remove('show-active')
    skillsBtn.classList.remove('show-active')
    experienceEl.classList.add("animationEx")
    educationEl.classList.remove('animationEx')
    skillsEL.classList.remove('animationEx')
})

educationBtn.addEventListener('click',()=>{
    showExperience.classList.add('hide')
    showSkills.classList.add('hide')
    showEducation.classList.remove('hide')
    educationBtn.classList.add('show-active')
    experienceBtn.classList.remove('show-active')
    skillsBtn.classList.remove('show-active')
    educationEl.classList.add('animationEx')
    experienceEl.classList.remove("animationEx")
    skillsEL.classList.remove("animationEx")

})

skillsBtn.addEventListener('click',()=>{
    showEducation.classList.add('hide')
    showExperience.classList.add('hide')
    showSkills.classList.remove('hide')
    skillsBtn.classList.add('show-active')
    experienceBtn.classList.remove('show-active')
    educationBtn.classList.remove('show-active')
    skillsEL.classList.add('animationEx')
    experienceEl.classList.remove("animationEx")
    educationEl.classList.remove("animationEx")
    moving.forEach(move=>{
        move.classList.add('move')
    })
    movingNum.forEach(moveNum=>{
        moveNum.classList.add('moveNum')
    })
})
////////////////////////////////////

const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')

const projectEl = document.querySelector('.projects')
const allProject = document.querySelectorAll('.project')


const projectbox = document.querySelector('.container-project')


let  i = 0   
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
nextBtn.addEventListener('click',()=>{
    nextProject()
})
prevBtn.addEventListener('click',()=>{
    prevProject()
})
setInterval(() => {
    nextProject()
    setTimeout(() => {
        
    }, 6000);
}, 6000);





let  imgRandom;
const quotes = document.querySelector('.qoutes')
const getApiQuotes = async (i)=>{
    const responce = await fetch('https://api.quotable.io/random?minLength=50&maxLength=100')
    const data = await responce.json()
    let div = document.createElement('div')
    div.classList.add('card-coute')
    let imgDiv = document.createElement('div')
    imgDiv.classList.add('img-coute')
    let imgCoute = document.createElement('img')
    imgCoute.src=   `https://picsum.photos/380/280?random=${i}`;
    imgCoute.alt= "img"
    imgDiv.appendChild(imgCoute)
    let contenuDiv = document.createElement('div')
    let p = document.createElement('p')
    contenuDiv.appendChild(p)
    contenuDiv.classList.add('contenu-coute')
    p.textContent = data.content
    quotes.appendChild(div)
    div.appendChild(imgDiv)
    div.appendChild(contenuDiv)


}

for(let i = 1 ;i<7; i++){
    getApiQuotes(i)
 
}


const footerBtn = document.querySelector('footer img')

footerBtn.addEventListener('click', ()=>{
    window.scrollTo(1, 0)
})

const sendEmailBtn = document.querySelector('.btn-send-message')
const nameEl = document.querySelector('.name')
const emailEl = document.querySelector('.email')
const textAreaEl = document.querySelector('.message')
const telEl = document.querySelector('.tel')


const sections = document.querySelectorAll('.container-section:not(:first-child)')

window.addEventListener('scroll',()=>{
    const triggerSection = window.innerHeight/5*3

    sections.forEach((section)=>{
        const sectionTop = section.getBoundingClientRect().top
        if(sectionTop < triggerSection){
           section.classList.add("show-section")
        }else{
            section.classList.remove("show-section")
        }
    })
  
})

