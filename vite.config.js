import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [  tailwindcss(),react()],
<<<<<<< HEAD
  base: process.env.VITE_BASE_PATH ||"/ArthurPortofolio"||"/ArthurPorto2", 
=======
  base: "/ArthurPortofolio", 
>>>>>>> f767a81ee927cb37089f8449ff0f28ce7569bc0f
})
