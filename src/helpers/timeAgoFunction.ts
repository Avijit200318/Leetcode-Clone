export const timeAgoFunction = (createdAt: Date): string => {
    // 1. Convert createdAt to a Date object if it's a string
    const pastDate = (createdAt instanceof Date) ? createdAt : new Date(createdAt);

    // Guard against invalid dates
    if (isNaN(pastDate.getTime())) {
        return "Invalid Date";
    }

    // 2. Calculate the difference in milliseconds
    const diffMs = new Date().getTime() - pastDate.getTime();

    // Define time constants in milliseconds
    const MS_PER_SECOND = 1000;
    const MS_PER_MINUTE = 60 * MS_PER_SECOND;
    const MS_PER_HOUR = 60 * MS_PER_MINUTE;
    const MS_PER_DAY = 24 * MS_PER_HOUR;
    const MS_PER_WEEK = 7 * MS_PER_DAY;
    const MS_PER_MONTH = 30 * MS_PER_DAY; // Approximation (used 30 days for simplicity)
    const MS_PER_YEAR = 365 * MS_PER_DAY; // Approximation

    // 3. Determine the correct time unit and value

    // If less than a minute
    if (diffMs < MS_PER_MINUTE) {
        const seconds = Math.floor(diffMs / MS_PER_SECOND);
        return seconds <= 0 ? "just now" : `${seconds} seconds ago`;
    }
    
    // If less than an hour
    if (diffMs < MS_PER_HOUR) {
        const minutes = Math.floor(diffMs / MS_PER_MINUTE);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    // If less than a day
    if (diffMs < MS_PER_DAY) {
        const hours = Math.floor(diffMs / MS_PER_HOUR);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    // If less than a week (7 days)
    if (diffMs < MS_PER_WEEK) {
        const days = Math.floor(diffMs / MS_PER_DAY);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    // If less than a month (approx. 30 days)
    if (diffMs < MS_PER_MONTH) {
        const weeks = Math.floor(diffMs / MS_PER_WEEK);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }

    // If less than a year (approx. 365 days)
    if (diffMs < MS_PER_YEAR) {
        const months = Math.floor(diffMs / MS_PER_MONTH);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }

    // Otherwise, use years
    const years = Math.floor(diffMs / MS_PER_YEAR);
    return `${years} year${years > 1 ? 's' : ''} ago`;
}