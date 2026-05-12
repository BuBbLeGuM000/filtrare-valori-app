import { useState } from "react"; // ne permite să salvăm date în memoria paginii
import { filterEvenNumbers } from "./utils/filter"; // Importăm funcția noastră de filtrare custom 

export default function App() { 
  const [inputValue, setInputValue] = useState(""); // Creăm o stare (variabilă) pentru textul introdus de utilizator, inițial goală
  const [result, setResult] = useState(null); // Creăm o stare pentru a salva tabloul final cu numere pare, inițial este null
  const [error, setError] = useState(""); // Creăm o stare pentru a stoca mesaje de eroare în cazul în care ceva nu funcționează corect

  const processData = (text) => { // Definim o funcție care se va ocupa de procesarea textului (fie că e scris manual, fie citit din fișier)
    setError(""); // Resetăm orice eroare afișată anterior pe ecran, pregătindu-ne de o nouă procesare
    setResult(null); // Resetăm rezultatul anterior afișat pe ecran pentru a face loc celui nou

    if (text.trim() === "") { // Verificăm dacă textul introdus, după ce eliminăm spațiile invizibile de la margini, este gol
      setError("Te rog să introduci o listă de numere."); // Dacă este gol, setăm un mesaj de eroare 
      return; 
    } 

    const numbersArray = text.trim().split(/\s+/); // Convertim datele de intrare într-un tablou, separând valorile pe baza spațiilor goale sau rândurilor noi
    
    const dataObject = { values: numbersArray }; // Construim obiectul cerut în provocare, asociind tabloul de numere cheii 'values'
    
    const evenNumbersArray = filterEvenNumbers(dataObject); // Apelăm funcția noastră custom de filtrare și salvăm rezultatul
    
    setResult(evenNumbersArray); // Setăm starea paginii cu noul tablou de numere pare, ceea ce va forța interfața să le afișeze
  }; 

  const handleFileUpload = (event) => { // Definim funcția care rulează când utilizatorul selectează un fișier text din calculator
    const file = event.target.files[0]; // Extragem primul fișier selectat de utilizator din elementul de input HTML
    if (!file) return; // Dacă utilizatorul a anulat selecția și nu există niciun fișier, oprim funcția

    const reader = new FileReader(); // Instanțiem clasa FileReader API, recomandată în cerințe, pentru a putea citi fișierul local
    
    reader.onload = (e) => { // Definim ce se va întâmpla când fișierul a fost citit cu succes și este gata
      const content = e.target.result; // Salvăm conținutul text complet al fișierului într-o variabilă
      setInputValue(content); // Punem conținutul textului și în căsuța de input vizuală pentru a-l arăta utilizatorului
      processData(content); // Apelăm funcția noastră de procesare creată mai sus, folosind direct textul citit din fișier
    }; 
    
    reader.onerror = () => { // Definim ce se va întâmpla dacă apare o problemă la citirea fizică a fișierului 
      setError("Eroare la citirea fișierului text."); 
    }; 
    
    reader.readAsText(file); // Inițiem procesul efectiv de citire a fișierului selectat, ca pe un simplu text (String)
  }; 

  return ( // Returnăm codul JSX care va fi afișat efectiv pe ecranul browser-ului
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"> {/* Containerul principal care ocupă tot ecranul */}
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full"> {/* 'Cardul' alb din centru*/}
        <h1 className="text-2xl font-bold text-blue-600 mb-2">Filtrare Numere Pare</h1> {/* Titlul principal al aplicației */}
        <p className="text-gray-500 mb-6">Introdu o listă separată de spații sau încarcă un fișier.</p> 

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>} {/*dacă avem o eroare, o afișăm într-o cutie roșie */}

        <textarea // Câmpul de introducere a textului unde utilizatorul poate scrie direct
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
          rows="4" 
          placeholder="Ex: 1 2 3 4 5 6 7 8" // Textul demonstrativ afișat când căsuța este complet goală
          value={inputValue} // Legăm valoarea afișată în casetă de variabila noastră de stare 
          onChange={(e) => setInputValue(e.target.value)} // Când utilizatorul tastează, actualizăm instantaneu variabila noastră de stare cu noul text
        ></textarea> 

        <div className="flex flex-col sm:flex-row gap-4 mb-6"> 
          <button 
            onClick={() => processData(inputValue)} 
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition" 
          > 
            Filtrează → 
          </button> 

          <div className="relative flex-1"> 
            <input // Input-ul invizibil de tip fișier
              type="file" // Setăm tipul inputului pentru a deschide fereastra de selecție fișiere 
              accept=".txt" // Permitem selecția strict a fișierelor cu extensia text (.txt)
              onChange={handleFileUpload} // Când se alege un fișier, declanșăm funcția handleFileUpload definită de noi
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" // Ascundem vizual input-ul nativ făcându-l 100% transparent, dar ocupând tot spațiul
            /> 
            <div className="bg-gray-100 text-gray-700 border border-gray-300 py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition"> {/* Interfața vizibilă personalizată care se află "sub" input-ul invizibil */}
              ↑ Fișier .txt 
            </div> 
          </div> 
        </div> 

        {result && ( //tot acest bloc de mai jos este creat doar dacă variabila 'result' nu mai este null (deci s-a efectuat o filtrare)
          <div className="width: 75% bg-pink-50 border border-pink-200 rounded-lg"> {/* Containerul pentru rezultat*/}
            <h2 className="font-semibold text-blue-800 mb-2">Rezultat (doar numere pare):</h2> 
            {/* <p>Am găsit {result.length} numere pare.</p>*/}
            {result.length > 0 ? ( // verificăm dacă am găsit măcar un număr par
              <p className="text-gray-800 font-mono text-lg wrap-break-word"> 
                {result.join(" ")} {/* Transformăm tabloul de numere pare înapoi într-un șir de text simplu, punând un spațiu (" ") între ele */}
              </p> 
            ) : ( // Partea de 'else' a operatorului ternar (dacă nu au fost găsite numere pare deloc)
              <p className="text-gray-500 italic">Niciun număr par găsit în listă.</p>
            )} 
          </div> 
        )} 
      </div> 
    </div> 
  ); 
} 