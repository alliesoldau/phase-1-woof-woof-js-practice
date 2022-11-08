// Create dog nav bar
let dogInfoDiv = document.getElementById("dog-info")
let dogNavBarDiv = document.getElementById("dog-bar")
let dogImage = document.createElement('img')
let dogName = document.createElement('h2')
let dogButton = document.createElement('button')


document.addEventListener("DOMContentLoaded", () =>{
    fetch('http://localhost:3000/pups')
    .then((response) => response.json())
    .then((object) => {
        populateDogInfo(object[0])
        object.forEach(renderNavBar)
        console.log(object[0])
    })
})

function renderNavBar(object){
    let dogSpan = document.createElement("span")
    dogSpan.innerText = object.name
    dogSpan.addEventListener("click", () => {populateDogInfo(object)})
    dogNavBarDiv.append(dogSpan)
}

function populateDogInfo(object){
    dogImage.src = object.image
    dogInfoDiv.appendChild(dogImage)
    dogName.innerText = object.name
    dogInfoDiv.appendChild(dogName)
    dogButton.addEventListener("click", () => {buttonToggle(object)})
    dogButton.innerText = object.isGoodDog ? "Good dog!" : "Bad dog :("
    dogInfoDiv.appendChild(dogButton)
}

function buttonToggle(object){
    fetch(`http://localhost:3000/pups/${object.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            isGoodDog: object.isGoodDog
        }),
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
       })
       .then (response => response.json())
       .then ((data) => {
            console.log(`before flip: ${object.isGoodDog}`)
            // THE PATCH ISNT GOING THROUGH
            data.isGoodDog = !data.isGoodDog
            console.log(`after flip: ${object.isGoodDog}`)
    }) 
}


