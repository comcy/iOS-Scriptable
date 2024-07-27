// zeitdifferenz.js

// Funktion zur Berechnung der Zeitdifferenz
function calculateTimeDifference(startTime, endTime) {
    // Eingaben in Date-Objekte umwandeln
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    // Differenz in Millisekunden berechnen
    let differenceInMs = end - start;

    // Wenn die Endzeit vor der Startzeit liegt, addiere einen Tag (24 Stunden) zur Endzeit
    if (differenceInMs < 0) {
        differenceInMs += 24 * 60 * 60 * 1000;
    }

    // Differenz in Minuten umwandeln
    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

    // Stunden und Minuten berechnen
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;

    return { hours, minutes };
}

// Funktion zur Anpassung der Arbeitszeit
function adjustWorkTime(timeDifference) {
    const MAX_HOURS_1 = 2;
    const MAX_MINUTES_1 = 30;
    const MAX_TOTAL_MINUTES_1 = MAX_HOURS_1 * 60 + MAX_MINUTES_1;
    const ADJUSTMENT_1 = 15;

    const MAX_HOURS_2 = 4;
    const MAX_MINUTES_2 = 45;
    const MAX_TOTAL_MINUTES_2 = MAX_HOURS_2 * 60 + MAX_MINUTES_2;
    const ADJUSTMENT_2 = 45;

    let totalMinutes = timeDifference.hours * 60 + timeDifference.minutes;

    if (totalMinutes > MAX_TOTAL_MINUTES_2 + ADJUSTMENT_2) {
        totalMinutes -= ADJUSTMENT_2;
    } else if (totalMinutes > MAX_TOTAL_MINUTES_2) {
        totalMinutes = MAX_TOTAL_MINUTES_2;
    } else if (totalMinutes > MAX_TOTAL_MINUTES_1 + ADJUSTMENT_1) {
        totalMinutes -= ADJUSTMENT_1;
    } else if (totalMinutes > MAX_TOTAL_MINUTES_1) {
        totalMinutes = MAX_TOTAL_MINUTES_1;
    }

    const adjustedHours = Math.floor(totalMinutes / 60);
    const adjustedMinutes = totalMinutes % 60;

    return { hours: adjustedHours, minutes: adjustedMinutes };
}

module.exports = { calculateTimeDifference, adjustWorkTime };
