document.addEventListener("DOMContentLoaded", function () {
    const marques = [
        "CITROEN", "TOYOTA", "SMART", "RENAULT", "AUDI", "FIAT", "MITSUBISHI", "VOLKSWAGEN", "BMW", "SEAT",
        "OPEL", "SKODA", "MERCEDES", "SUZUKI", "HONDA", "NISSAN", "DACIA", "PGO", "DODGE", "CADILLAC", "PEUGEOT",
        "SUBARU", "PORSCHE", "SAAB", "ALFA-ROMEO", "VOLVO", "JAGUAR", "LAMBORGHINI", "BENTLEY", "CHEVROLET",
        "FORD", "KIA", "LANCIA", "HYUNDAI", "IVECO", "LAND ROVER", "MASERATI", "SSANGYONG", "CHRYSLER",
        "DAIHATSU", "JEEP", "LTI VEHICLES", "MINI", "DAEWOO", "FERRARI", "MAZDA", "MG", "ROVER", "ASTON MARTIN",
        "LEXUS", "DAIMLER", "ISUZU", "MORGAN", "TVR", "INFINITI", "JAGUAR LAND ROVER LIMITED", "LADA", "LOTUS",
        "MERCEDES AMG", "MAYBACH", "ROLLS ROYCE", "ALFA ROMEO", "RENAULT TECH", "DIJEAU CARROSSIER", "QUATTRO",
        "ROLLS-ROYCE", "HUMMER", "LTI", "LADA-VAZ", "THE LONDON TAXI COMPANY", "CARBODIES", "DANGEL",
        "FORD-CNG-TECHNIK", "HOMMELL", "MEGA"
    ];
    
    const carburants = ["Essence", "Essence/GN", "Essence/GP", "FE", "Diesel", "GN/Essence", "GP/Essence", "EH", "GN", "GH", "EE", "GN/GS", "EN", "GL"];
    const hybrides = ["Non hybride", "Hybride"];
    const boites = ["M 5", "A 5", "A 6", "A 7", "M 6", "A 4", "V 0", "M5", "A4", "D 6", "A 8", "D 7", "D 5", "A 9", "M 7", "V .", "A 0", "A 3", "A6", "5", "A5", "6", "S 6", "M6"];
    const carrosseries = ["BERLINE", "COUPE", "CABRIOLET", "TS TERRAINS/CHEMINS", "BREAK", "MINISPACE", "COMBISPACE", "MINIBUS", "MONOSPACE COMPACT", "MONOSPACE", "COMBISPCACE"];

    function populateSelect(selectId, values) {
        const select = document.getElementById(selectId);
        values.forEach(value => {
            let option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });
    }
    
    populateSelect("marque", marques);
    populateSelect("carburant", carburants);
    populateSelect("hybride", hybrides);
    populateSelect("boite", boites);
    populateSelect("carrosserie", carrosseries);
    
    document.getElementById("search").addEventListener("click", async function () {
        const formData = {
            marque: document.getElementById("marque").value,
            carburant: document.getElementById("carburant").value,
            hybride: document.getElementById("hybride").value,
            puissance: document.getElementById("puissance").value,
            boite: document.getElementById("boite").value,
            annee: document.getElementById("annee").value,
            carrosserie: document.getElementById("carrosserie").value,
        };

        let query = Object.entries(formData)
            .filter(([_, value]) => value !== "")
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

        // let url = `http://backend_findcar:5000/car-research/${query}`;
        let url = `http://myservice.info/backend-findcar/car-research/${query}`;
        
        try {
            const response = await fetch(url, { mode: 'no-cors' });
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error("Erreur lors de la requête:", error);
        }
    });

    async function fetchPollution(id) {
        // let url = `http://backend_pollution:5000/champv9-finder/id=${id}`;
        let url = `http://myservice.info/backend-pollution/champv9-finder/id=${id}`;
        try {
            const response = await fetch(url, { mode: 'no-cors' });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erreur lors de la récupération de CHAMP V9:", error);
            return "Non renseigné";
        }
    }

    async function displayResults(results) {
        const resultContainer = document.getElementById("result-list");
        resultContainer.innerHTML = "";

        for (let car of results.slice(0, 20)) {
            let champV9 = car[15];
            if (!champV9) {
                champV9 = await fetchPollution(car[0]);
            }
            
            let div = document.createElement("div");
            div.classList.add("result-item");
            div.innerHTML = `
                <p><strong>Marque:</strong> ${car[1]}</p>
                <p><strong>Modèle:</strong> ${car[2]}</p>
                <p><strong>Carburant:</strong> ${car[7]}</p>
                <p><strong>Hybride:</strong> ${car[8] || "Non renseigné"}</p>
                <p><strong>Puissance admin:</strong> ${car[9]}</p>
                <p><strong>Puissance max:</strong> ${car[10]} ch</p>
                <p><strong>Boîte:</strong> ${car[11]}</p>
                <p><strong>CHAMP V9:</strong> ${champV9}</p>
                <p><strong>Année:</strong> ${car[24]}</p>
                <p><strong>Carrosserie:</strong> ${car[25] || "Non renseigné"}</p>
            `;
            resultContainer.appendChild(div);
        }
        document.getElementById("results").classList.remove("hidden");
    }
});
