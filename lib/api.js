const BACKEND_URL = "http://83.229.84.217:5000";

// Xəbərləri çəkmək üçün
export async function fetchNews() {
  const res = await fetch(`${BACKEND_URL}/api/news`, { cache: 'no-store' });
  return res.json();
}

// Məhsulları çəkmək üçün
export async function fetchProducts() {
  const res = await fetch(`${BACKEND_URL}/api/products`, { cache: 'no-store' });
  return res.json();
}