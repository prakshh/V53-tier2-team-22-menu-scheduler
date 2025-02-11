# Project Overview

## 1. The app has two main components:

* AllergyManager: Allows users to add/remove allergens, storing them in localStorage.
* WeeklyScheduler: Fetches dish data from an API, filters out allergens, and creates a weekly meal plan. Users can export the plan to PDF or Excel.

## 2. Folder Structure
* src/components/AllergyManager.jsx → Manages allergies
* src/components/WeeklyScheduler.jsx → Generates and displays a weekly meal plan
* src/utils/api.js → Fetches dishes from an API
* src/utils/storage.js → Saves/retrieves allergy data from localStorage
* src/App.js → Main app structure
* src/index.css → Tailwind CSS for styling
* src/main.jsx → Renders the root React component
* index.html → Entry point for the app

## 3. Components Breakdown

### A. AllergyManager.jsx (Managing Allergies)

* Uses useState to store allergy data.
* Retrieves stored allergies from localStorage (getAllergies).

#### Allows users to:

* Add a new allergen (saved to localStorage).
* Remove an allergen from the list.
* Updates state and storage on any change.

### B. WeeklyScheduler.jsx (Meal Planning)

* Uses useState and useEffect to fetch dish data and generate a schedule.
* Fetches dishes from https://menus-api.vercel.app/dishes.
* Filters dishes based on stored allergens (i.e., avoids meals containing allergens).
* Generates a weekly meal schedule (randomized).

#### Allows users to:

* Mark a day as "Day Off" (no meal assigned).
* Regenerate the schedule with new dishes.
* Export the schedule to: PDF using jsPDF and Excel using xlsx

### C. api.js (Fetching Dish Data)

* Fetches dish data from an external API.
* Handles errors if fetching fails.

### D. storage.js (Storing Allergies)

* Saves/retrieves allergy data from localStorage.

## 4. App.js (Main Layout)

Displays:
* Header (Menu Scheduler title)
* AllergyManager
* WeeklyScheduler
* Uses Tailwind CSS for styling.

## 5. Other Setup Files

* index.css → Uses Tailwind CSS utilities.
* main.jsx → Renders <App /> inside #root (React's entry point).
* index.html → Defines the root div where the app is injected.

## 6. How the App Works

* User adds allergies → Stored in localStorage.
* Dishes are fetched from API.

Schedule is generated:
* Filters out dishes containing allergens.
* Randomly assigns meals to each day.

User can modify the schedule:
* Mark a day off.
* Regenerate meals.
* Export to PDF/Excel.
* Data persists (Allergies stored in localStorage).

## 7. Technologies Used

* React (State management, Hooks)
* Tailwind CSS (Styling)
* date-fns (Date formatting)
* lucide-react (Icons)
* jsPDF & xlsx (Exporting data)
* Vite (React bundler)

## 8. Summary

This is a React-based meal planning app that: ✔️ Manages food allergies
✔️ Fetches dishes from an API
✔️ Generates a weekly meal plan
✔️ Allows modifications (day off, regeneration)
✔️ Exports schedules to PDF & Excel
✔️ Uses localStorage to persist allergy data