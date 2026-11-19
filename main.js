"use strict";

// ===== Global array - holds all clothing items =====
let allClothes = [];

// ===== 16 basic colors used for matching a hex value to a Hebrew name =====
const basicColors = [
    { name: "שחור", r: 0, g: 0, b: 0 },
    { name: "לבן", r: 255, g: 255, b: 255 },
    { name: "אפור", r: 128, g: 128, b: 128 },
    { name: "כסף", r: 192, g: 192, b: 192 },
    { name: "אדום", r: 255, g: 0, b: 0 },
    { name: "בורדו", r: 128, g: 0, b: 0 },
    { name: "כתום", r: 255, g: 165, b: 0 },
    { name: "צהוב", r: 255, g: 255, b: 0 },
    { name: "זית", r: 128, g: 128, b: 0 },
    { name: "ירוק בהיר", r: 0, g: 255, b: 0 },
    { name: "ירוק", r: 0, g: 128, b: 0 },
    { name: "תכלת", r: 0, g: 255, b: 255 },
    { name: "כחול", r: 0, g: 0, b: 255 },
    { name: "כחול כהה", r: 0, g: 0, b: 128 },
    { name: "סגול", r: 128, g: 0, b: 128 },
    { name: "ורוד", r: 255, g: 105, b: 180 }
];


// ===== Convert a hex color (#rrggbb) to the closest Hebrew color name =====
function getColorName(hex) {

    // Split the hex string into red, green and blue numbers
    const red = parseInt(hex.substring(1, 3), 16);
    const green = parseInt(hex.substring(3, 5), 16);
    const blue = parseInt(hex.substring(5, 7), 16);

    let closestName = basicColors[0].name;
    let smallestDistance = Infinity;

    // The closest basic color is the one with the smallest RGB difference
    for (let i = 0; i < basicColors.length; i++) {

        const distance =
            Math.abs(red - basicColors[i].r) +
            Math.abs(green - basicColors[i].g) +
            Math.abs(blue - basicColors[i].b);

        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestName = basicColors[i].name;
        }
    }

    return closestName;
}


// ===== Validate the form values - returns an array of error messages =====
function validateCloth(type, description, price, discount, imageUrl) {

    const errors = [];

    if (type === "") {
        errors.push("יש לבחור סוג בגד");
    }

    if (description.trim().length < 2) {
        errors.push("התיאור חייב להכיל לפחות 2 תווים");
    }

    if (isNaN(price) || price < 1 || price > 1000) {
        errors.push("המחיר חייב להיות בין 1 ל-1000");
    }

    if (isNaN(discount) || discount < 0 || discount > 100) {
        errors.push("ההנחה חייבת להיות בין 0 ל-100");
    }

    if (!imageUrl.startsWith("http")) {
        errors.push("קישור התמונה חייב להתחיל ב-http");
    }

    return errors;
}


// ===== Add a clothing item =====
function addCloth(event) {

    // Prevent the page from reloading on submit
    event.preventDefault();

    // Get elements
    const typeBox = document.getElementById("typeBox");
    const descriptionBox = document.getElementById("descriptionBox");
    const colorBox = document.getElementById("colorBox");
    const priceBox = document.getElementById("priceBox");
    const discountBox = document.getElementById("discountBox");
    const imageBox = document.getElementById("imageBox");
    const errorPar = document.getElementById("errorPar");

    // Get values (empty number fields become NaN so validation catches them)
    const type = typeBox.value;
    const description = descriptionBox.value.trim();
    const color = colorBox.value;
    const price = priceBox.value === "" ? NaN : +priceBox.value;
    const discount = discountBox.value === "" ? NaN : +discountBox.value;
    const imageUrl = imageBox.value.trim();

    // JavaScript validation (the only validation method in this project)
    const errors = validateCloth(type, description, price, discount, imageUrl);

    if (errors.length > 0) {
        errorPar.innerHTML = "❌ " + errors.join("<br>❌ ");
        errorPar.classList.add("show");
        return;
    }

    // Clear the error message
    errorPar.innerHTML = "";
    errorPar.classList.remove("show");

    // Build the clothing object
    const cloth = {
        type,
        description,
        color,
        price,
        discount,
        imageUrl
    };

    // Add to the array
    allClothes.push(cloth);

    // Save -> display -> clear the form
    saveToStorage();
    displayAllClothes();
    clearForm();
}


// ===== Display all clothes in the table =====
function displayAllClothes() {

    const tableBody = document.getElementById("tableBody");

    // Clear the previous display
    tableBody.innerHTML = "";

    for (let i = 0; i < allClothes.length; i++) {

        // Final price = price - discount
        const finalPrice = allClothes[i].price - (allClothes[i].price * allClothes[i].discount / 100);

        // Choose a CSS class for the final price by range
        let priceClass = "price-low";
        if (finalPrice > 200 && finalPrice <= 700) {
            priceClass = "price-medium";
        }
        else if (finalPrice > 700) {
            priceClass = "price-high";
        }

        // Build a row using a template literal
        const tr = `
        <tr>
            <td>${allClothes[i].type}</td>
            <td>${allClothes[i].description}</td>
            <td class="color-cell" data-color="${allClothes[i].color}">
                ${getColorName(allClothes[i].color)}
            </td>
            <td>${allClothes[i].price.toFixed(2)} ₪</td>
            <td>${allClothes[i].discount}%</td>
            <td class="${priceClass}">
                ${finalPrice.toFixed(2)} ₪
            </td>
            <td>
                <img class="table-image" src="${allClothes[i].imageUrl}" alt="${allClothes[i].type} - ${allClothes[i].description}">
            </td>
            <td>
                <button class="delete-btn" onclick="deleteCloth(${i})">🗑️</button>
            </td>
        </tr>
        `;

        // Add the row to the table
        tableBody.innerHTML += tr;
    }

    paintColorCells();
    updateStats();
}


// ===== Paint each color cell with the item's real color (set from JS, not inline HTML) =====
function paintColorCells() {

    const colorCells = document.querySelectorAll(".color-cell");

    for (let i = 0; i < colorCells.length; i++) {
        colorCells[i].style.color = colorCells[i].dataset.color;
    }
}


// ===== Delete a single item =====
function deleteCloth(index) {

    const sure = confirm("האם אתה בטוח שברצונך למחוק את הפריט?");

    if (sure) {
        allClothes.splice(index, 1);
        saveToStorage();
        displayAllClothes();
    }
}


// ===== Save to localStorage =====
function saveToStorage() {

    const jsonString = JSON.stringify(allClothes);
    localStorage.setItem("all-clothes", jsonString);
}


// ===== Load from localStorage =====
function loadFromStorage() {

    const jsonString = localStorage.getItem("all-clothes");

    if (jsonString) {
        allClothes = JSON.parse(jsonString);
    }
}


// ===== Load + display (called on body onload) =====
function loadAndDisplay() {

    loadFromStorage();
    displayAllClothes();
}


// ===== Clear the form + focus the first field =====
function clearForm() {

    const clothForm = document.getElementById("clothForm");
    clothForm.reset();

    // Return focus to the first field
    document.getElementById("typeBox").focus();
}


// ===== Statistics below the table =====
function updateStats() {

    const statsPar = document.getElementById("statsPar");

    if (allClothes.length === 0) {
        statsPar.innerHTML = "📊 אין פריטי לבוש בטבלה עדיין.";
        return;
    }

    // Calculate sums
    let sumOriginal = 0;
    let sumFinal = 0;

    for (let i = 0; i < allClothes.length; i++) {

        sumOriginal += allClothes[i].price;

        const finalPrice = allClothes[i].price - (allClothes[i].price * allClothes[i].discount / 100);
        sumFinal += finalPrice;
    }

    // Calculate averages
    const avgOriginal = sumOriginal / allClothes.length;
    const avgFinal = sumFinal / allClothes.length;

    // Display
    statsPar.innerHTML =
        "📊 <strong>מספר פריטים:</strong> " + allClothes.length +
        "<br>💰 <strong>ממוצע מחירים (מקורי):</strong> " + avgOriginal.toFixed(2) + " ₪" +
        "<br>🏷️ <strong>ממוצע מחירים (אחרי הנחה):</strong> " + avgFinal.toFixed(2) + " ₪";
}
