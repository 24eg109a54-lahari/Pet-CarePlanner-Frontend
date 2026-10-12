import { resolve } from "path";
import { defineConfig } from "vite";

const rootDir = import.meta.dirname;

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        login: resolve(rootDir, "login.html"),
        profile: resolve(rootDir, "profile.html"),
        addPet: resolve(rootDir, "add-pet.html"),
        addTask: resolve(rootDir, "add-task.html"),
        addVaccination: resolve(rootDir, "add-vaccination.html"),
        addReminder: resolve(rootDir, "add-reminder.html"),
        addLostPet: resolve(rootDir, "add-lost-pet.html"),
        breedInfo: resolve(rootDir, "breed-info.html"),
        care: resolve(rootDir, "care.html"),
        health: resolve(rootDir, "health.html"),
        medicine: resolve(rootDir, "medicine.html"),
        aiAssistant: resolve(rootDir, "ai-assistant.html"),
      },
    },
  },
});
