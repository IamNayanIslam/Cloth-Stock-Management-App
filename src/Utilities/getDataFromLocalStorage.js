export default function getData(getFrom) {
  try {
    const data = localStorage.getItem(getFrom);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing data from local storage:", error);
    return [];
  }
}
