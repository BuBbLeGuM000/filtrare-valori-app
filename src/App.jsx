import { useState } from "react"; // Importăm hook-ul useState din React pentru a ne permite să salvăm date în memoria paginii
import { filterEvenNumbers } from "./utils/filter"; // Importăm funcția noastră de filtrare custom creată la pasul anterior
import { Upload, ArrowRight } from "lucide-react"; // Importăm două iconițe grafice din librăria lucide-react pentru un design plăcut

export default function App() { // Declarăm și exportăm funcția componentei principale a paginii noastre web
  const [inputValue, setInputValue] = useState(""); // Creăm o stare (variabilă) pentru textul introdus de utilizator, inițial goală
  const [result, setResult] = useState(null); // Creăm o stare pentru a salva tabloul final cu numere pare, inițial este null
  const [error, setError] = useState(""); // Creăm o stare pentru a stoca mesaje de eroare în cazul în care ceva nu funcționează corect

  const processData = (text) => { // Definim o funcție care se va ocupa de procesarea textului (fie că e scris manual, fie citit din fișier)
    setError(""); // Resetăm orice eroare afișată anterior pe ecran, pregătindu-ne de o nouă procesare
    setResult(null); // Resetăm rezultatul anterior afișat pe ecran pentru a face loc celui nou

    if (text.trim() === "") { // Verificăm dacă textul introdus, după ce eliminăm spațiile invizibile de la margini, este gol
      setError("Te rog să introduci o listă de numere."); // Dacă este gol, setăm un mesaj de eroare prietenos
      return; // Oprim execuția funcției aici pentru a nu procesa date goale
    } // Închidem blocul de verificare a textului gol

    const numbersArray = text.trim().split(/\s+/); // Convertim datele de intrare într-un tablou, separând valorile pe baza spațiilor goale sau rândurilor noi
    
    const dataObject = { values: numbersArray }; // Construim obiectul cerut în provocare, asociind tabloul de numere cheii 'values'
    
    const evenNumbersArray = filterEvenNumbers(dataObject); // Apelăm funcția noastră custom de filtrare, pasând obiectul, și salvăm rezultatul
    
    setResult(evenNumbersArray); // Setăm starea paginii cu noul tablou de numere pare, ceea ce va forța interfața să le afișeze
  }; // Închidem funcția de procesare

  const handleFileUpload = (event) => { // Definim funcția care rulează când utilizatorul selectează un fișier text din calculator
    const file = event.target.files[0]; // Extragem primul fișier selectat de utilizator din elementul de input HTML
    if (!file) return; // Dacă utilizatorul a anulat selecția și nu există niciun fișier, oprim funcția

    const reader = new FileReader(); // Instanțiem clasa FileReader API, recomandată în cerințe, pentru a putea citi fișierul local
    
    reader.onload = (e) => { // Definim ce se va întâmpla când fișierul a fost citit cu succes și este gata
      const content = e.target.result; // Salvăm conținutul text complet al fișierului într-o variabilă
      setInputValue(content); // Punem conținutul textului și în căsuța de input vizuală pentru a-l arăta utilizatorului
      processData(content); // Apelăm funcția noastră de procesare creată mai sus, folosind direct textul citit din fișier
    }; // Închidem definiția evenimentului de încărcare reușită
    
    reader.onerror = () => { // Definim ce se va întâmpla dacă apare o problemă la citirea fizică a fișierului de pe disc
      setError("Eroare la citirea fișierului text."); // Afișăm un mesaj de eroare pe ecran
    }; // Închidem definiția evenimentului de eroare
    
    reader.readAsText(file); // Inițiem procesul efectiv de citire a fișierului selectat, ca pe un simplu text (String)
  }; // Închidem funcția de manipulare a încărcării fișierelor

  return ( // Returnăm codul JSX (HTML-ul specific React) care va fi afișat efectiv pe ecranul browser-ului
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"> {/* Containerul principal care ocupă tot ecranul, cu fundal gri deschis, folosit pentru centrare prin flexbox */}
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full"> {/* 'Cardul' alb din centru, cu umbră, colțuri rotunjite și o lățime maximă controlată */}
        <h1 className="text-2xl font-bold text-blue-600 mb-2">Filtrare Numere Pare</h1> {/* Titlul principal al aplicației, mare, îngroșat și albastru */}
        <p className="text-gray-500 mb-6">Introdu o listă separată de spații sau încarcă un fișier.</p> {/* Text explicativ secundar, de culoare gri, plasat sub titlu */}

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>} {/* Randare condițională: dacă avem o eroare, o afișăm într-o cutie roșie */}

        <textarea // Câmpul de introducere a textului unde utilizatorul poate scrie direct
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none" // Clase Tailwind pentru lățime maximă, margini, rotunjiri și efect de focus
          rows="4" // Setăm înălțimea inițială a casetei de text la 4 rânduri
          placeholder="Ex: 1 2 3 4 5 6 7 8" // Textul demonstrativ afișat când căsuța este complet goală
          value={inputValue} // Legăm valoarea afișată în casetă de variabila noastră de stare (inputValue)
          onChange={(e) => setInputValue(e.target.value)} // Când utilizatorul tastează, actualizăm instantaneu variabila noastră de stare cu noul text
        ></textarea> {/* Închidem elementul textarea */}

        <div className="flex flex-col sm:flex-row gap-4 mb-6"> {/* Container cu flexbox: pe mobil elementele stau unele sub altele (column), pe ecrane mari stau pe rând (row) */}
          <button // Elementul buton pentru declanșarea manuală a procesului de filtrare
            onClick={() => processData(inputValue)} // La evenimentul de click, rulăm funcția processData cu textul curent din casetă
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition" // Clase Tailwind pentru buton albastru care se lățește și își schimbă culoarea la hover
          > {/* Deschidem conținutul butonului */}
            Filtrează <ArrowRight size={20} /> {/* Textul butonului urmat de componenta grafică a unei săgeți din lucide-react */}
          </button> {/* Închidem butonul */}

          <div className="relative flex-1"> {/* Un container ajutător care ne permite să ascundem input-ul urât nativ de fișiere peste un buton personalizat */}
            <input // Input-ul invizibil de tip fișier
              type="file" // Setăm tipul inputului pentru a deschide fereastra de selecție fișiere a sistemului de operare
              accept=".txt" // Permitem selecția strict a fișierelor cu extensia text (.txt)
              onChange={handleFileUpload} // Când se alege un fișier, declanșăm funcția handleFileUpload definită de noi
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" // Ascundem vizual input-ul nativ făcându-l 100% transparent, dar ocupând tot spațiul
            /> {/* Închidem input-ul de fișier */}
            <div className="bg-gray-100 text-gray-700 border border-gray-300 py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition"> {/* Interfața vizibilă personalizată care se află "sub" input-ul invizibil */}
              <Upload size={20} /> Fișier .txt {/* Componenta grafică de upload și textul explicativ de pe butonul fals */}
            </div> {/* Închidem interfața personalizată a butonului de încărcare */}
          </div> {/* Închidem containerul ajutător pentru fișiere */}
        </div> {/* Închidem containerul cu butoane */}

        {result && ( // Randare condițională: tot acest bloc de mai jos este creat doar dacă variabila 'result' nu mai este null (deci s-a efectuat o filtrare)
          <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg"> {/* Containerul pentru rezultat cu un fundal albastru foarte deschis și un chenar subtil */}
            <h2 className="font-semibold text-blue-800 mb-2">Rezultat (doar numere pare):</h2> {/* Titlul secțiunii de rezultat, de culoare albastru închis */}
            {result.length > 0 ? ( // Randare condițională folosind un operator ternar: verificăm dacă am găsit măcar un număr par
              <p className="text-gray-800 font-mono text-lg wrap-break-word"> {/* Paragraf pentru afișarea numerelor, folosind un font monospațiat pentru lizibilitatea cifrelor */}
                {result.join(" ")} {/* Transformăm tabloul de numere pare înapoi într-un șir de text simplu, punând un spațiu (" ") între ele */}
              </p> // Închidem paragraful numerelor
            ) : ( // Partea de 'else' a operatorului ternar (dacă nu au fost găsite numere pare deloc)
              <p className="text-gray-500 italic">Niciun număr par găsit în listă.</p> // Afișăm un mesaj explicativ cu font cursiv
            )} {/* Închidem verificarea dacă există elemente în array */}
          </div> // Închidem containerul rezultatului
        )} {/* Închidem randarea condițională principală pentru rezultat */}
      </div> {/* Închidem cardul alb din centru */}
    </div> 
  ); // Închidem returnarea blocului JSX
} // Închidem funcția App definitiv