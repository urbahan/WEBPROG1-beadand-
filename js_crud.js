/**
 * JS CRUD - Pizza Kezelő Rendszer
 * Feladat: CRUD alkalmazás JavaScript-el, tömbben tárolt adatokkal[cite: 5, 38, 39].
 */

// 1. Alapadatok inicializálása (Ez felel meg az adatbázis fájl egyik részének) [cite: 6, 39]
let pizzas = [
    { name: "Margherita", price: 2100 },
    { name: "Salami", price: 2500 },
    { name: "Hawaii", price: 2400 },
    { name: "Quattro Formaggi", price: 2800 }
];

/**
 * READ - Adatok megjelenítése a táblázatban [cite: 32]
 */
function displayPizzas() {
    const tbody = document.getElementById('pizzaBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    pizzas.forEach((pizza, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${pizza.name}</strong></td>
                <td>${pizza.price.toLocaleString()} Ft</td>
                <td>
                    <button class="edit-btn" onclick="editPizza(${index})" title="Szerkesztés">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deletePizza(${index})" title="Törlés">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

/**
 * CREATE & UPDATE - Pizza mentése vagy módosítása [cite: 32]
 */
function savePizza() {
    const nameInput = document.getElementById('pizzaName');
    const priceInput = document.getElementById('pizzaPrice');
    const indexInput = document.getElementById('pizzaIndex');
    const saveBtn = document.getElementById('saveBtn');

    // Validáció: Ne lehessen üres mezőt menteni
    if (!nameInput.value.trim() || !priceInput.value) {
        alert("Kérjük, töltsön ki minden mezőt!");
        return;
    }

    const pizzaData = {
        name: nameInput.value.trim(),
        price: parseInt(priceInput.value)
    };

    if (indexInput.value === "") {
        // CREATE: Új elem hozzáadása a tömbhöz [cite: 6, 32]
        pizzas.push(pizzaData);
    } else {
        // UPDATE: Meglévő elem módosítása a tömbben [cite: 32]
        const index = indexInput.value;
        pizzas[index] = pizzaData;
        
        // Visszaállítás alapállapotba
        indexInput.value = "";
        saveBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Hozzáadás';
        saveBtn.style.background = "#27ae60"; 
    }

    // Form ürítése és táblázat frissítése
    nameInput.value = "";
    priceInput.value = "";
    displayPizzas();
}

/**
 * DELETE - Pizza törlése a tömbből [cite: 32]
 */
function deletePizza(index) {
    if (confirm(`Biztosan törölni szeretné a(z) ${pizzas[index].name} pizzát?`)) {
        pizzas.splice(index, 1); // Törlés a tömbből [cite: 6]
        displayPizzas();
    }
}

/**
 * EDIT - Adatok betöltése a formba módosításhoz
 */
function editPizza(index) {
    const pizza = pizzas[index];
    const saveBtn = document.getElementById('saveBtn');
    
    document.getElementById('pizzaName').value = pizza.name;
    document.getElementById('pizzaPrice').value = pizza.price;
    document.getElementById('pizzaIndex').value = index;

    // Gomb stílusának módosítása szerkesztési módra
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Módosítás mentése';
    saveBtn.style.background = "#3498db";
    
    // Fókusz a névre, hogy azonnal írhasson a felhasználó
    document.getElementById('pizzaName').focus();
}

// Inicializálás az oldal betöltésekor
document.addEventListener('DOMContentLoaded', displayPizzas);