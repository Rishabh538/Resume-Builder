function addNewWEField(){ 
    let newTitle = document.createElement("input");
    let newYear = document.createElement("input");
    let newNode = document.createElement("textarea");


    newTitle.classList.add("form-control");
    newTitle.classList.add("weField");
    newTitle.classList.add("mt-2");
    newTitle.setAttribute("placeholder","Enter Company Name");

    newYear.classList.add("form-control");
    newYear.classList.add("weField");
    newYear.setAttribute("placeholder","Enter yearfrom - toyear");

    newNode.classList.add("form-control");
    newNode.classList.add("weField");
    newNode.setAttribute("placeholder","Enter Job descriYear");



    let weOb=document.getElementById("we");
    let weAddButtonOb = document.getElementById("weAddButton"); 

    weOb.insertBefore(newTitle, weAddButtonOb);
    weOb.insertBefore(newYear, weAddButtonOb);
    weOb.insertBefore(newNode, weAddButtonOb);
}

function addNewAQField(){ 

    let newNode = document.createElement("input");
    let newTitle = document.createElement("input");
    let newYear = document.createElement("input");

    newTitle.classList.add("aqTitle");
    newTitle.setAttribute("placeholder", "Enter Title");
    newTitle.classList.add("form-control");
    newTitle.classList.add("aqField");
    newTitle.classList.add("mt-2");

    newYear.classList.add("aqTitle");
    newNode.classList.add("form-control");
    newNode.classList.add("aqField");
    newNode.setAttribute("placeholder","Enter institute");

    newYear.classList.add("aqTitle");
    newYear.setAttribute("placeholder", "Enter yearfrom - toyear");
    newYear.classList.add("form-control");
    newYear.classList.add("aqField");

    let aqOb=document.getElementById("aq");
    let aqAddButtonOb = document.getElementById("aqAddButton"); 

    aqOb.insertBefore(newTitle, aqAddButtonOb);
    aqOb.insertBefore(newNode, aqAddButtonOb);
    aqOb.insertBefore(newYear, aqAddButtonOb);
    
}

//generating cv
function generateCV() {
    // console.log("Generating cv");

    let nameField=document.getElementById("nameField").value;
    
    let nameT=document.getElementById("nameT");

    nameT.innerHTML = nameField;


    //direct
    document.getElementById("contactT").innerHTML=document.getElementById("contactField").value;

    document.getElementById("addressT").innerHTML=document.getElementById("addressField").value;

    document.getElementById("profileT").innerHTML=document.getElementById("profileField").value;

    document.getElementById("emailT").innerHTML=document.getElementById("emailField").value;

    //WorkExperience
    let wes=document.getElementsByClassName("weField");
    let str1="";
    for(let e of wes){
        str1 +=`<li> ${e.value} <br> </li>`;
    }
  
    document.getElementById("expp").innerHTML=str1;

    //aq
    let aqs=document.getElementsByClassName("aqField");
    let str2="";
    for (let f of aqs){
        str2 +=`<li> ${f.value} <br> </li>`;
    }

    document.getElementById("edu").innerHTML=str2;

    //skills
    var markedCheckbox = document.getElementsByName("skillField");
    let str3="";
    for (var g of markedCheckbox) {
        if (g.checked)
          str3 +=`<li>${g.value}</li>`;
        }
    document.getElementById("skillT").innerHTML=str3;

    //Languages
    var markcheck = document.getElementsByName("langField");
    let str4="";
    for(var h of markcheck){
        if(h.checked)
            str4 +=`<li>${h.value}</li>`;
    }
    document.getElementById("langT").innerHTML = str4;


    //imgUploader
    let file = document.getElementById("imgField").files[0]
    
    console.log(file);

    let reader = new FileReader()

    reader.readAsDataURL(file);

    console.log(reader.result);

    //set image to template
    reader.onloadend = function(){
        document.getElementById("imgTemplate").src = reader.result;
    };
    

    // document.getElementById("cv-form").style.display="none";
    // document.getElementById("cv-template").style.display="block";

}

function printCV(){
    window.print();
}






//Resume Template Javascript code
/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)




/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})





/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/
function scaleCv() {
    document.body.classList.add('scale-cv')
}




/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/
function removeScale() {
    document.body.classList.remove('scale-cv')
}

/*==================== GENERATE PDF ====================*/
// PDF generated area

let areaCv = document.getElementById('area-cv')

let resumeButton = document.getElementById('resume-button')

// Html2pdf options
let opt = {
    margin: 0,
    filename: 'myResume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
}

// Function to call areaCv and Html2Pdf options 
function generateResume() {
    html2pdf(areaCv, opt)
}

// When the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () => {


    // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
    scaleCv()

    // 2. The PDF is generated
    generateResume()

    // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
    setTimeout(removeScale, 5000)
})
