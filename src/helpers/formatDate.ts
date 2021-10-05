export const formatDateString = (dateString = '') => {
  if (dateString === null) {
    return '--/--/----';
  } else {
    const date = new Date(dateString).toLocaleDateString();
    return date;
  }
};