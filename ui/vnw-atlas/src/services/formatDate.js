

const formatDate = (dateStr, s = '/') => {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${day}${s}${month}${s}${year}`;
};

export default formatDate;