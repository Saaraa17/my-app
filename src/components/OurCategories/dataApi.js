// api.js
export async function fetchData(category) {
    try {
      const response = await fetch("https://demo.kwtmarkets.com/items");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      
      // تصفية البيانات بناءً على الفئة
      const filteredData = result.filter(item => item.category === category);
      return filteredData;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  