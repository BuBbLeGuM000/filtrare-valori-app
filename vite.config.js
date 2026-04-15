import { defineConfig } from "vite"; // Importăm funcția principală de configurare oferită de Vite
import react from "@vitejs/plugin-react"; // Importăm plugin-ul oficial de React necesar pentru compilare
import tailwindcss from "@tailwindcss/vite"; // Importăm plugin-ul Tailwind CSS v4 pentru a procesa stilurile

export default defineConfig({ // Exportăm obiectul de configurare evaluat de funcția defineConfig
  plugins: [ // Definim lista de plugin-uri active în acest proiect
    react(), // Activăm plugin-ul React pentru a înțelege sintaxa JSX
    tailwindcss(), // Activăm plugin-ul Tailwind pentru a injecta clasele CSS utilitare
  ], // Închidem lista de plugin-uri
}); // Închidem obiectul de configurare