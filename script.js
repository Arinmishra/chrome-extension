const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const linksFromLocalStorage = JSON.parse(localStorage.getItem("links"))
let links = []

if(linksFromLocalStorage){
    links = linksFromLocalStorage
    renderlinks(links)
}

inputBtn.addEventListener("click", function(){
    links.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("links", JSON.stringify(links))
    renderlinks(links)
})

function renderlinks(link){
    let mylinks = ""
    for(let i = 0; i < links.length; i++){
        mylinks += `<li><a target = "_blank" href = "${link[i]}">${link[i]}</a></li>`
    }
    ulEl.innerHTML = mylinks
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        links.push(tabs[0].url)
        localStorage.setItem("links", JSON.stringify(links))
        renderlinks(links)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    links = []
    renderlinks(links)
})