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

const formatDate = (date: Date): string => {
    if (!(date instanceof Date)) {
        throw new Error('Invalid date object');
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export { formatTime, formatDate };
