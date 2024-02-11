import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-6064e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListDatabase = ref(database, "endorsements")

const textInput = document.getElementById("text-input")
const fromInput = document.getElementById("from-input")
const toInput = document.getElementById("to-input")
const publishBtn = document.getElementById("publish-btn")


let currentIndex = 0
let endorsementArray = []
const endorsements = document.getElementById("endorsements")
const backBtn = document.getElementById("back-btn")
const nextBtn = document.getElementById("next-btn")

backBtn.addEventListener("click", (snapshot) => {
    if (endorsementArray) {
        if (currentIndex > 0) {
            currentIndex--
            renderEndorsement()
        }
    }
})

nextBtn.addEventListener("click", (snapshot) => {
    if (endorsementArray) {
        if (currentIndex < endorsementArray.length - 1) {
            currentIndex++
            renderEndorsement()
        }
    }

})

publishBtn.addEventListener("click", function () {
    let text = textInput.value
    let from = fromInput.value
    let to = toInput.value


    let endorsementArray = [from, text, to, 0]
    push(endorsementListDatabase, endorsementArray)
})

onValue(endorsementListDatabase, function (snapshot) {
    if (snapshot.exists()) {
        endorsementArray = Object.entries(snapshot.val())
        clearEndorsement()
        renderEndorsement()
    } else {
        clearEndorsement()

        let noEndorsements = document.createElement("p")
        noEndorsements.textContent = "No endorsements added"

        endorsements.append(noEndorsements)
    }
})

function renderEndorsement() {
    let endorsementID = endorsementArray[currentIndex][0]
    let endorsementItems = endorsementArray[currentIndex][1]

    let from = document.createElement("p")
    from.textContent = `From ${endorsementItems[0]}`
    let text = document.createElement("p")
    text.textContent = `From ${endorsementItems[1]}`
    let to = document.createElement("p")
    to.textContent = `From ${endorsementItems[2]}`
    let likes = document.createElement("p")
    likes.textContent = `ID: ${endorsementID} <i class="fas fa-heart"></i>${endorsementItems[3]}`

    endorsements.append(from)
    endorsements.append(text)
    endorsements.append(to)
    endorsements.append(likes)

}

function clearEndorsement() {
    console.log("Removing nothing")
}

function getLikedEndorsement(e) {
    // Localstorage
    // getDifferentLocalStorages
}