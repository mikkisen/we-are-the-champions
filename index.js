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
const endorsements = document.querySelectorAll(".endorsements")

publishBtn.addEventListener("click", function () {
    let text = textInput.value
    let from = fromInput.value
    let to = toInput.value


    let endorsementArray = [from, text, to, 0]
    push(endorsementListDatabase, endorsementArray)
    clearInputFields(fromInput, textInput, toInput)
})

onValue(endorsementListDatabase, function (snapshot) {
    if (snapshot.exists()) {
        let endorsementArray = Object.entries(snapshot.val())

        for (let i = 0; i < endorsementArray.length; i++) {
            let endorsementID = endorsementArray[i][0]
            let endorsementItems = endorsementArray[i][1]

            let fromItem = endorsementItems[0]
            let textItem = endorsementItems[1]
            let toItem = endorsementItems[2]
            showEndorsement(fromItem, textItem, toItem)
        }

        snapshot.addEventListener("click", function () {

        })

    } else {
        endorsements.innerHTML = "No endorsements added"
    }
})



function clearInputFields(from, text, to) {
    text.textContent = ""
    from.textContent = ""
    to.textContent = ""
}

function clearEndorsements() {
    endorsementsList.innerHTML = ""
}

function createEndorsement(from, text, to) {
    const heartIcon = `<i class="fas fa-heart"></i>`

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