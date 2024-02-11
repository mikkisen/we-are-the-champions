import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, get, set, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
let likeBtn = document.getElementById("like-btn")
const endorsements = document.getElementById("endorsements")
const backBtn = document.getElementById("back-btn")
const nextBtn = document.getElementById("next-btn")

likeBtn.addEventListener("click", () => {
    console.log("Hello!")
})

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

endorsements.addEventListener("dblclick", function () {
    let endorsementID = endorsementArray[currentIndex][0]
    if (!localStorage.getItem(`${endorsementID}`)) {
        localStorage.setItem(endorsementID, 1)
        incrementValueAtPath(endorsementID)
        renderEndorsement()
    } else {
        console.log("Already added like to item")
    }
    console.log("Double click!")
})

function incrementValueAtPath(endorsementID) {
    const path = `endorsements/${endorsementID}/3`; // Adjust the path as needed
    const dbRef = ref(database, path);

    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            const currentCount = snapshot.val() || 0; // Default to 0 if not set
            const newCount = currentCount + 1;
            // Update the value in the database
            set(dbRef, newCount);
        } else {
            console.log("No data available at path:", path);
            // Initialize the count if it doesn't exist
            set(dbRef, 1);
        }
    }).catch((error) => {
        console.error("Firebase read failed:", error);
    });
}

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
    clearEndorsement()
    let endorsementItems = endorsementArray[currentIndex][1]

    let from = document.createElement("p")
    from.textContent = `From ${endorsementItems[0]}`
    let text = document.createElement("p")
    text.textContent = `From ${endorsementItems[1]}`
    let to = document.createElement("p")
    to.textContent = `From ${endorsementItems[2]}`
    let likes = document.createElement("button")
    likes.textContent = `❤️ ${endorsementItems[3]}`
    likes.id = "like-btn"

    endorsements.append(from)
    endorsements.append(text)
    endorsements.append(to)
    endorsements.append(likes)

}

function clearEndorsement() {
    endorsements.innerHTML = ""
}