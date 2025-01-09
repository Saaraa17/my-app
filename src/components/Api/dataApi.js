export const API_URL = "https://kwtmarkets.net/back/items";

/**
 * دالة لجلب جميع العناصر مع `status=act` فقط
 * تستخدم في المنتجات الموصى بها.
 */
export async function fetchRecommendedProducts() {
  try {
    const response = await fetch(`${API_URL}?status=act`);
    if (!response.ok) {
      throw new Error("Failed to fetch recommended products");
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

/**
 * دالة لجلب البيانات بناءً على الفئة أو نص البحث.
 * تستخدم في عمليات البحث أو التصفية.
 * 
 * @param {string} category - اسم الفئة.
 * @param {string} searchQuery - نص البحث.
 * @returns {Promise<Array>} - قائمة العناصر التي تم تصفيتها.
 */
export async function fetchData(category, searchQuery) {
  try {
    const response = await fetch(`${API_URL}?status=act`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();

    // تصفية البيانات بناءً على الفئة
    let filteredData = result;
    if (category) {
      filteredData = result.filter((item) => item.category === category);
    }

    // إضافة وظيفة البحث
    if (searchQuery && searchQuery.trim()) {
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredData;
  } catch (err) {
    throw new Error(err.message);
  }
}
