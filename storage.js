/* =========================================================
   PET CARE PLANNER
   SAFE LOCAL STORAGE HELPERS
   Step 8.6
========================================================= */

/* =========================================================
   GET ARRAY FROM LOCAL STORAGE
========================================================= */

function getStoredArray(key) {
    try {
        const rawData = localStorage.getItem(key);

        if (!rawData) {
            return [];
        }

        const data = JSON.parse(rawData);

        return Array.isArray(data) ? data : [];

    } catch (error) {

        console.error(
            "Could not read localStorage:",
            key,
            error
        );

        return [];
    }
}


/* =========================================================
   SAVE ARRAY TO LOCAL STORAGE
========================================================= */

function saveStoredArray(key, data) {

    try {

        if (!Array.isArray(data)) {

            console.error(
                "saveStoredArray expected an array:",
                key
            );

            return false;
        }

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

        return true;

    } catch (error) {

        console.error(
            "Could not save localStorage:",
            key,
            error
        );

        return false;
    }
}


/* =========================================================
   GET SINGLE VALUE
========================================================= */

function getStoredValue(key, defaultValue = "") {

    try {

        const value =
            localStorage.getItem(key);

        return value !== null
            ? value
            : defaultValue;

    } catch (error) {

        console.error(
            "Could not read localStorage value:",
            key,
            error
        );

        return defaultValue;
    }
}


/* =========================================================
   SAVE SINGLE VALUE
========================================================= */

function saveStoredValue(key, value) {

    try {

        localStorage.setItem(
            key,
            String(value)
        );

        return true;

    } catch (error) {

        console.error(
            "Could not save localStorage value:",
            key,
            error
        );

        return false;
    }
}


/* =========================================================
   REMOVE VALUE
========================================================= */

function removeStoredValue(key) {

    try {

        localStorage.removeItem(key);

        return true;

    } catch (error) {

        console.error(
            "Could not remove localStorage value:",
            key,
            error
        );

        return false;
    }
}


/* =========================================================
   GENERATE ID
========================================================= */

function makeId(prefix = "record") {

    if (
        window.crypto &&
        typeof window.crypto.randomUUID === "function"
    ) {

        return prefix + "_" +
            window.crypto.randomUUID();
    }

    return prefix + "_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 10);
}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   PET EMOJI
========================================================= */

function getPetEmoji(type) {

    const value =
        String(type || "")
            .toLowerCase();

    if (value === "dog") {
        return "🐶";
    }

    if (value === "cat") {
        return "🐱";
    }

    if (value === "rabbit") {
        return "🐰";
    }

    if (value === "bird") {
        return "🐦";
    }

    if (value === "hamster") {
        return "🐹";
    }

    if (value === "guinea pig") {
        return "🐹";
    }

    if (value === "fish") {
        return "🐠";
    }

    return "🐾";
}


/* =========================================================
   FIND PET
========================================================= */

function findPetById(petId) {

    const pets =
        getStoredArray("pets");

    return pets.find(
        pet =>
            String(pet.id) ===
            String(petId)
    ) || null;
}


/* =========================================================
   PET RECORD MATCHING
========================================================= */

function recordBelongsToPet(record, pet) {

    if (!record || !pet) {
        return false;
    }

    /* New format */

    if (record.petId != null) {

        return (
            String(record.petId) ===
            String(pet.id)
        );
    }


    /* Older format */

    const possibleName =
        record.pet ||
        record.petName ||
        record.pet_name;


    if (possibleName) {

        return (
            String(possibleName)
                .toLowerCase() ===

            String(pet.name || "")
                .toLowerCase()
        );
    }


    return false;
}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(value) {

    if (!value) {
        return "";
    }

    try {

        const date =
            new Date(value);

        if (Number.isNaN(date.getTime())) {
            return String(value);
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    } catch (error) {

        return String(value);
    }
}


/* =========================================================
   SELECTED PET
========================================================= */

function getSelectedPetId() {

    return getStoredValue(
        "selectedPetId",
        ""
    );
}


function setSelectedPetId(petId) {

    return saveStoredValue(
        "selectedPetId",
        petId
    );
}