export const fetchSheetData = async () => {
  try {
    const response = await fetch(
      "https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch sheet data");
    }
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
