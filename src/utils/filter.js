export function filterEvenNumbers(dataObj) { // funcția primește lista de valori sub formă de obiect
    const array = dataObj.values || []; // Extragem tabloul din cheia 'values' a obiectului, sau folosim un tablou gol ca măsură de siguranță
    const evenNumbers = []; // Inițializăm un tablou gol unde vom stoca manual doar numerele pare 
    
    for (let i = 0; i < array.length; i++) { 
        const elementAsText = array[i]; // Extragem elementul curent de la poziția 'i' (care în acest moment este un șir de caractere/text)
        const num = parseInt(elementAsText, 10); // Convertim textul curent într-un număr întreg în baza 10
        
        if (!isNaN(num)) { // Verificăm cu strictețe dacă elementul convertit este într-adevăr un număr valid 
            if (num % 2 === 0) { 
                evenNumbers.push(num); // Dacă numărul este par, îl împingem (adăugăm) la finalul noului nostru tablou de numere pare
            } 
        }
    } 
    
    return evenNumbers; // Returnăm tabloul nou care acum conține exclusiv numerele pare
} 