//variavles.......................
let courseList = document.getElementById("courses-list");
let cartContent = document.getElementById("cart-content");
let clearCart = document.getElementById("clear-cart");
let subMenu = document.querySelector(".submenu");

let getCourses = getFormLocalStorage();
//eventListener.....................
eventListener();

function eventListener() {
    courseList.addEventListener("click", buyCourse)
    document.addEventListener("DOMContentLoaded", addFormLocalStorage);
    // document.addEventListener("DOMContentLoaded", removeFormCart);
    
    cartContent.addEventListener("click", removeFormCart)
    clearCart.addEventListener("click", removeAll)
}


//function.................
function buyCourse(e) {
    e.preventDefault();
    let courseId = e.target.getAttribute("data-id")
    
    if(e.target.classList.contains("add-to-cart") && noDuplicateCourse(courseId)){
        let course = e.target.parentElement.parentElement;
        getCourseContent(course);
    }
    else{
        alert("Already added");
    }
    
}

function noDuplicateCourse(courseId) {
    let ok=true;
    getCourses.forEach(function(value, index){
        if(value.id == courseId){
            ok=false;
        }
    })
    return ok;
}

function getCourseContent(course) {
    const courseContent = {
        image: course.querySelector(".course-image").src,
        name: course.querySelector("h4").innerText,
        price: course.querySelector("p span").innerText,
        id: course.querySelector(".add-to-cart").getAttribute("data-id")
    }
    addToCart(courseContent);   
}

function addToCart(courseContent) {
    
    courseItem(courseContent)
    setIntoLocalStorage(courseContent)
    countItem() 
    countPrice()
}

function courseItem(courseContent) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td><img height="80px" src="${courseContent.image}"></td>
    <td>${courseContent.name}</td>
    <td>${courseContent.price}</td>
    <td class="removeCart" data-id=${courseContent.id}>X</td>
    `;
    cartContent.querySelector("tbody").appendChild(tr);
}

function setIntoLocalStorage(courseContent) {
    getCourses.push(courseContent);
    localStorage.setItem("courses", JSON.stringify(getCourses))
}

function getFormLocalStorage() {
    let courses = localStorage.getItem("courses");
    if(courses == null)
    {
        return [];
    }
    else{
        return JSON.parse(courses);
    }
}

function addFormLocalStorage() {
    
    countItem() 
    countPrice()
    getCourses.forEach(function(courseContent){
        courseItem(courseContent);
    })
    
}

//remove...............

function removeFormCart(e) {
    e.preventDefault();
    let courseId;
    if(e.target.classList.contains("removeCart")){
        courseId = e.target.getAttribute("data-id");
        e.target.parentElement.remove();
    }

    getCourses.forEach(function(value, index){
        if(value.id == courseId)
        {
            getCourses.splice(index, 1) 
        }
        localStorage.clear();
        localStorage.setItem("courses", JSON.stringify(getCourses))
    })
}

function removeAll() {
    localStorage.clear();
    cartContent.querySelector("tbody").innerHTML=``;
}

//countItem....................

function countItem() {
    let temp = subMenu.children[2].innerText;
    
    let x= temp.slice(0,-1)+countCorses();
    subMenu.children[2].innerText= x;
}
function countCorses() {
    let count=0;
    getCourses.forEach(function(){
        count++;
    })
    return count;
}

function countPrice() {
    let temp = subMenu.children[1].innerText;
    
    let x= temp.slice(0,-2)+coursesPrice();
    subMenu.children[1].innerText = x;
}

function coursesPrice() {
    let price = 0;
    getCourses.forEach(function(value, index){
        price += parseInt(value.price.slice(1));
    })
    return price;
}