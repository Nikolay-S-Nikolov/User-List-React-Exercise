export const fromIsoDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return date.toLocaleDateString('en-US', options);
}