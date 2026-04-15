export function filterEvenNumbers(dataObj) { // Definim și exportăm funcția cerută care primește lista de valori sub formă de obiect
    const array = dataObj.values || []; // Extragem tabloul din cheia 'values' a obiectului, sau folosim un tablou gol ca măsură de siguranță
    const evenNumbers = []; // Inițializăm un tablou gol unde vom stoca manual doar numerele pare (propriul algoritm de filtrare)
    
    for (let i = 0; i < array.length; i++) { // Inițiem o structură de control repetitivă (bucla for) pentru a itera prin fiecare element
        const elementAsText = array[i]; // Extragem elementul curent de la poziția 'i' (care în acest moment este un șir de caractere/text)
        const num = parseInt(elementAsText, 10); // Convertim textul curent într-un număr întreg în baza 10
        
        if (!isNaN(num)) { // Verificăm cu strictețe dacă elementul convertit este într-adevăr un număr valid (Not-a-Number este fals)
            if (num % 2 === 0) { // Verificăm dacă restul împărțirii numărului la 2 este exact 0 (ceea ce înseamnă că numărul este par)
                evenNumbers.push(num); // Dacă numărul este par, îl împingem (adăugăm) la finalul noului nostru tablou de numere pare
            } // Închidem blocul de verificare a parității
        } // Închidem blocul de verificare a validității numărului
    } // Închidem structura repetitivă (bucla for)
    
    return evenNumbers; // Returnăm tabloul nou care acum conține exclusiv numerele pare, îndeplinind cerința principală
} // Închidem funcția