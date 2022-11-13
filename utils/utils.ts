
function toDaysHours(time: number): string {
    const timeLeft = Math.floor(time - (Date.now() / 1000));

    var days = 0;
    var hours = 0;

    if (timeLeft > 0) {
        days = Math.floor(timeLeft / 86400);
        hours = Math.floor((timeLeft - days*86400) / 3600);
    }

    const daysHours = "Your subscription expires in: " + (days).toString() + " days " + (hours).toString() + " hours";
    return daysHours;
}

export default toDaysHours;

