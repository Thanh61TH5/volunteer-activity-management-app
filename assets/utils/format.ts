// dateUtils.ts
const formatTime = (timeString: string | undefined): string => {
    // Check if timeString is defined
    if (!timeString) {
        return '';
    }

    const [hours, minutes] = timeString.split(':').map(Number);

    let period = '';
    if (hours >= 0 && hours < 12) {
        period = 'sáng';
    } else if (hours >= 12 && hours < 18) {
        period = 'chiều';
    } else {
        period = 'tối';
    }

    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
};

// dateUtils.ts
// ... (other code)

const formatDate = (date: Date | null | undefined): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        // Return an empty string if date is null, undefined, not a Date object, or not a valid date
        return '';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};



export { formatTime, formatDate };


