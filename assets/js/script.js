const allInput = document.querySelectorAll(".input")
const allLabel = document.querySelectorAll(".label")
const dayInput = document.querySelector("[data-day]")
const dayAlert = document.querySelector(".error-alert.day")
const monthInput = document.querySelector("[data-month]")
const monthAlert = document.querySelector(".error-alert.month")
const yearInput = document.querySelector("[data-year]")
const yearAlert = document.querySelector(".error-alert.year")
const button = document.querySelector("button")
const yearResult = document.querySelector(".years-result")
const monthResult = document.querySelector(".months-result")
const dayResult = document.querySelector(".days-result")

/* Today's date */
var today = new Date()
var dayToday = today.getDate()
var monthToday = today.getMonth() + 1
var yearToday = today.getFullYear()


// Add event listener to all inputs
allInput.forEach(input => input.addEventListener("input", validateInput))

var inputValues = {
    day: '',
    month: '',
    year: ''
}

function validateInput(event) {
    const {name, value} = event.target

    // Store the input values
    inputValues[name] = value


    // ------------ Day Validation ------------
    
    // If the day is not valid
    if(inputValues.day > numberOfDaysInMonth(inputValues.year, inputValues.month) || inputValues.day < 1) {
        dayInput.dataset.day = "invalid"

        // Show alert
        dayAlert.classList.add("invalid")
        // If not empty
        if(inputValues.day) {
            dayAlert.innerHTML = "Must be a valid day"
        } 
        // If empty
        else {
            dayAlert.innerHTML = "This field is required"
        }
    }

    // If the day is valid
    else {
        dayInput.dataset.day = "valid"

        // Hide alert
        dayAlert.classList.remove("invalid")
        dayAlert.innerHTML = ""
    }

    // ------------ Month Validation ------------

    // If the month input not valid
    if(inputValues.month > 12 || inputValues.month < 1) {
        monthInput.dataset.month = "invalid"
        
        // Show the alert
        monthAlert.classList.add("invalid")
        // If not empty
        if(inputValues.month) {
            monthAlert.innerHTML = "Must be a valid month"
        }
        // If not empty
        else  {
            monthAlert.innerHTML = "This field is required"
        }
    }

    // If the month input is valid
    else {
        monthInput.dataset.month = "valid"

        monthAlert.classList.remove("invalid")
    }

    // ------------ Year Validation ------------

    // If the year input is not valid
    if(inputValues.year > yearToday || inputValues.year < 1000) {
        yearInput.dataset.year = "invalid"
        
        // Show the alert
        yearAlert.classList.add("invalid")
        // If more than this year
        if(inputValues.year > yearToday) {
            yearAlert.innerHTML = "Must be in the past"
        }
        // If not 4 digits year
        else if(inputValues.year < 1000 && inputValues.year != '') {
            yearAlert.innerHTML = "Must be at least 4 digits year"
        }
        // If empty
        else {
            yearAlert.innerHTML = "This field is required"
        }
    }

    // If the year input is valid
    else {
        yearInput.dataset.year = "valid"

        yearAlert.classList.remove("invalid")
    }


    // If there is an input that is not valid
    if(dayInput.dataset.day == "invalid" || monthInput.dataset.month == "invalid" || yearInput.dataset.year == "invalid") {
        allInput.forEach(element => {
            element.classList.add("invalid")
        })

        allLabel.forEach(element => {
            element.classList.add("invalid")
        })
    }

    // If all inputs are valid
    else if(dayInput.dataset.day == "valid" && monthInput.dataset.month == "valid" && yearInput.dataset.year == "valid") {
        allInput.forEach(element => {
            element.classList.remove("invalid")
        })

        allLabel.forEach(element => {
            element.classList.remove("invalid")
        })
    }
}


// Add event listener to button
button.addEventListener("click", calculateAge)

function calculateAge(event) {
    /* Input's date */
    const dayBirth = inputValues.day
    const monthBirth = inputValues.month
    const yearBirth = inputValues.year 
    
    /* Calculate age */
    var ageDays = dayToday - dayBirth
    var ageMonths = monthToday - monthBirth
    var ageYears = yearToday - yearBirth

    // If day subtraction is negative
    if(ageDays < 0) {
        ageDays = ageDays + numberOfDaysInMonth(yearToday, monthToday)
        ageMonths -= 1
    }

    // If month subtraction is negative
    if(ageMonths < 0) {
        ageMonths += 12
        ageYears -= 1
    }

    if(dayInput.dataset.day == "valid" && monthInput.dataset.month == "valid" && yearInput.dataset.year == "valid") {
        yearResult.innerHTML = ageYears
        monthResult.innerHTML = ageMonths
        dayResult.innerHTML = ageDays
    }

    event.preventDefault()
}

function numberOfDaysInMonth(year, month) {
    const date = new Date(year, month, 0)

    return date.getDate()
}