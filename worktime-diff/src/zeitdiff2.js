Scriptable 2

// Function to calculate the time difference
function calculateTimeDifference(startTime, endTime) {
    // Convert start and end times to Date objects
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    // Check if the dates are valid
    if (isNaN(start) || isNaN(end)) {
        return "Invalid time format. Please use HH:MM.";
    }

    // Calculate the difference in milliseconds
    let diff = end - start;

    // Convert milliseconds to minutes
    let diffMinutes = diff / 1000 / 60;

    // Calculate hours and minutes
    let hours = Math.floor(diffMinutes / 60);
    let minutes = diffMinutes % 60;

    // Apply the first rule (subtract up to 15 minutes if time > 2 hours)
    if (hours > 2) {
        let excessMinutes = (hours - 2) * 60 + minutes;
        let minutesToSubtract = Math.min(excessMinutes, 15);
        diffMinutes -= minutesToSubtract;
    }

    // Recalculate hours and minutes after first rule
    hours = Math.floor(diffMinutes / 60);
    minutes = diffMinutes % 60;

    // Apply the second rule (subtract up to 45 minutes if time > 5 hours 30 minutes)
    if (hours > 5 || (hours === 5 && minutes > 30)) {
        let excessMinutes = (hours - 5) * 60 + minutes - 30;
        let minutesToSubtract = Math.min(excessMinutes, 45);
        diffMinutes -= minutesToSubtract;
    }

    // Recalculate hours and minutes after second rule
    hours = Math.floor(diffMinutes / 60);
    minutes = diffMinutes % 60;

    // Format the calculated time difference
    let result = `Time difference: ${hours} hours and ${minutes} minutes`;

    // Check if total time exceeds 10 hours and append a warning if true
    if (hours > 10 || (hours === 10 && minutes > 0)) {
        result += "\nWarning: The total time exceeds 10 hours!";
    }

    return result;
}


// MAIN
async function main() {
    let startTime = await promptForTime("Enter the start time (HH:MM):");
    let endTime = await promptForTime("Enter the end time (HH:MM):");

    let result = calculateTimeDifference(startTime, endTime);

    let alert = new Alert();
    alert.title = "Time Difference Calculation";
    alert.message = result;
    alert.addAction("OK");
    await alert.present();
}

// Function to prompt for time input
async function promptForTime(message) {
    let alert = new Alert();
    alert.title = message;
    alert.addTextField("HH:MM");
    alert.addAction("OK");
    await alert.present();
    return alert.textFieldValue(0);
}

main();
