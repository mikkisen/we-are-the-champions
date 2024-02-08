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
const endorsementsList = document.getElementById("endorsements-list")

publishBtn.addEventListener("click", function () {
    let text = textInput.value
    let from = fromInput.value
    let to = toInput.value
    createEndorsement(text, from, to)
})

onValue(endorsementListDatabase, function (snapshot) {
    if (snapshot.exists()) {
        let endorsementArray = Object.entries(snapshot.val())
        let endorsementID = endorsementArray[0]
        let endorsementItems = endorsementArray[1]


        console.log(endorsementItems)
        console.log(endorsementID)

    }
})

function createEndorsement(from, text, to) {
    let endorsementArray = [from, text, to, 0]
    const heartIcon = `<i class="fas fa-heart"></i>`
    push(endorsementListDatabase, endorsementArray)

    // Lager listen
    let endorsementList = document.createElement("li")

    //Lager to
    let endorsementTo = document.createElement("p")
    endorsementTo.textContent = `To ${to}`

    //Lager text
    let endorsementText = document.createElement("p")
    endorsementText.textContent = `${text}`

    //Lager from
    let endorsementFrom = document.createElement("p")
    endorsementFrom.textContent = `From ${from}`

    //Lager from
    let endorsementLikes = document.createElement("p")
    endorsementLikes.innerHTML = `${heartIcon} 0`

    //Legger alt inn i listen
    endorsementList.append(endorsementTo)
    endorsementList.append(endorsementText)
    endorsementList.append(endorsementFrom)
    endorsementList.append(endorsementLikes)
    //Legger listen inn i UL
    endorsementsList.append(endorsementList)
}


function getLikedEndorsement(e) {
    // Localstorage
    // getDifferentLocalStorages
}