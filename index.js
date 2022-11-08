// Create dog nav bar
let dogInfoDiv = document.getElementById("dog-info")
let dogNavBarDiv = document.getElementById("dog-bar")
let dogImage = document.createElement('img')
let dogName = document.createElement('h2')
let dogButton = document.createElement('button')

document.addEventListener("DOMContentLoaded", () =>{
    reRender()
})

function reRender() {
    fetch('http://localhost:3000/pups')
    .then((response) => response.json())
    .then((object) => {
        while (dogNavBarDiv.firstChild) {
            dogNavBarDiv.removeChild(dogNavBarDiv.firstChild)
        }
        object.forEach(renderNavBar)
    })
}

function renderNavBar(object){
    let dogSpan = document.createElement("span")
    dogSpan.innerText = object.name
    dogSpan.addEventListener("click", () => {populateDogInfo(object)})
    dogNavBarDiv.append(dogSpan)
}

let dogId

function populateDogInfo(object){
    dogImage.src = object.image
    dogInfoDiv.appendChild(dogImage)
    dogName.innerText = object.name
    dogInfoDiv.appendChild(dogName)
    dogButton.addEventListener("click", () => {buttonToggle(object)})
    dogButton.innerText = object.isGoodDog ? "Good dog!" : "Bad dog :("
    dogInfoDiv.appendChild(dogButton)
    dogId = object.id
}

function buttonToggle(object){
    fetch(`http://localhost:3000/pups/${dogId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            // this is the actual PATCH
            // left is the key, right is what we want the value to
            isGoodDog: dogButton.innerText === "Good dog!" ? false : true
        }),
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
       })
       .then (response => response.json())
       .then ((data) => {
        // this is the RESPONSE not the PATCH
        dogButton.innerText = data.isGoodDog ? "Good dog!" : "Bad dog :("
        reRender()
    }) 
}


