// JavaScript Document

let menuObject = document.querySelector(".top-header");
let siteContent = document.querySelector(".main-content");
let siteNavigation= document.querySelector(".site-navigation");

menuObject.addEventListener("click", function(event){
    siteNavigation.classList.toggle("open");
});

siteContent.addEventListener("click", function(event){
    siteNavigation.classList.remove("open");
})