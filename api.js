// Utility for sending form data to backend
export async function submitAnalysis(form, type) {
  const response = await fetch('https://backend-vanikai.onrender.com/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, form })
  });
  return response.json();
}
