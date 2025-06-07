import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(
  {
    plugins: [tailwindcss(), react()],
    server: {
      host: '0.0.0.0', // or use your IP like '192.168.1.10'
      port: 5173
    }
  }
)
// This configuration sets up a Vite project with Tailwind CSS and React.
// It includes the necessary plugins and configures the development server to be accessible from any IP address on port 5173.
// Make sure to install the required dependencies:
// npm install tailwindcss @tailwindcss/vite @vitejs/plugin-react
// You can then run the project using `npm run dev` or `yarn dev`.
// Ensure you have a `tailwind.config.js` file set up for Tailwind CSS to work properly.