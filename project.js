// Fare MATRIX JavaScript Code
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
//https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
//https://www.w3schools.com/tags/tag_datalist.asp

const baseFare = 50;     // Minimum fare (includes first 2km)
const perKMrate = 15;    // Cost per km beyond 2km
const baseKM = 2;        // Distance included in base fare

// Distance(KM) between stations
const distances = {
    "Santolan-Katipunan": 2.0,
    "Katipunan-Anonas": 1.0,
    "Anonas-Araneta Center-Cubao": 1.0,
    "Araneta Center-Cubao-Betty Go-Belmonte": 1.0,
    "Betty Go-Belmonte-Gilmore": 1.0,
    "Gilmore-J. Ruiz": 1.0,     
    "J. Ruiz-V. Mapa": 1.0,
    "V. Mapa-Pureza": 1.0,
    "Pureza-Legarda": 1.0,
    "Legarda-Recto": 1.0
};

// Station order
const stations = [
    "Santolan",
    "Katipunan",
    "Anonas",
    "Araneta Center-Cubao",
    "Betty Go-Belmonte",
    "Gilmore",
    "J. Ruiz",
    "V. Mapa",
    "Pureza",
    "Legarda",
    "Recto"
];

function calculateFare(isDiscounted) {

    const pickup = document.getElementById("browser").value;
    const dropoff = document.getElementById("browser2").value;

    if (!pickup || !dropoff) {
        alert("Please select both pickup and drop-off locations.");
        return;
    }

    if (pickup === dropoff) {
        alert("Pickup and drop-off cannot be the same.");
        return;
    }

    let startIndex = stations.indexOf(pickup);
    let endIndex = stations.indexOf(dropoff);

    if (startIndex === -1 || endIndex === -1) {
        alert("Invalid station selected.");
        return;
    }

    let totalDistance = 0;

    // Direction
    if (startIndex < endIndex) {
        for (let i = startIndex; i < endIndex; i++) {
            let key = stations[i] + "-" + stations[i + 1];
            totalDistance += distances[key];
        }
    } else {
        for (let i = startIndex; i > endIndex; i--) {
            let key = stations[i - 1] + "-" + stations[i];
            totalDistance += distances[key];
        }
    }

    // Compute fare
    let totalFare = baseFare;

    if (totalDistance > baseKM) {
        let extraKM = totalDistance - baseKM;
        totalFare += extraKM * perKMrate;
    }

    // Discount (20%)
    if (isDiscounted) {
        totalFare *= 0.8;
    }

    // Results
    document.getElementById("distance").textContent = totalDistance.toFixed(2);
    document.getElementById("fare").textContent = totalFare.toFixed(2);

}


