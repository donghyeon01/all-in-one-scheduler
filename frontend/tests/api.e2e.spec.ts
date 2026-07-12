import { test, expect } from '@playwright/test';

// These tests exercise backend API endpoints end-to-end. Ensure backend is running at http://localhost:8080
// and frontend (if needed) at http://localhost:5173. You can set PLAYWRIGHT_BASE_URL env var for the frontend.

const API_BASE = process.env.PLAYWRIGHT_API_URL || 'http://localhost:8080';

function uniqueEmail() {
  return `e2e_${Date.now()}@example.com`;
}

test.describe('API E2E: auth + scheduling', () => {
  test('signup -> login -> refresh -> scheduling', async ({ request }) => {
    const email = uniqueEmail();
    const password = 'Password123!';

    // Signup
    const signupRes = await request.post(`${API_BASE}/api/auth/signup`, {
      data: { email, password, name: 'E2E User' },
    });
    expect(signupRes.ok()).toBeTruthy();

    // Login
    const loginRes = await request.post(`${API_BASE}/api/auth/login`, {
      data: { email, password },
    });
    expect(loginRes.ok()).toBeTruthy();
    const loginBody = await loginRes.json();
    expect(loginBody).toHaveProperty('accessToken');
    const accessToken = loginBody.accessToken as string;

    // Capture refresh cookie from Set-Cookie
    const setCookie = loginRes.headers()['set-cookie'];
    expect(setCookie).toBeTruthy();
    // find refreshToken cookie
    const cookieHeader = Array.isArray(setCookie) ? setCookie.find(c => c.startsWith('refreshToken=')) : setCookie;

    // Use access token to call a protected endpoint (get tasks)
    const tasksRes = await request.get(`${API_BASE}/api/tasks`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    expect(tasksRes.status()).toBe(200);

    // Call refresh endpoint using cookie header
    const refreshRes = await request.post(`${API_BASE}/api/auth/refresh`, {
      headers: { Cookie: cookieHeader as string },
      data: {},
    });
    expect(refreshRes.ok()).toBeTruthy();
    const refreshBody = await refreshRes.json();
    expect(refreshBody).toHaveProperty('accessToken');

    // Call scheduling API (protected) using new access token
    const newAccessToken = refreshBody.accessToken as string;
    const schedRes = await request.post(`${API_BASE}/api/scheduling`, {
      headers: { Authorization: `Bearer ${newAccessToken}` },
      data: { title: 'E2E Meeting', startDate: new Date().toISOString().slice(0,10), endDate: new Date(Date.now()+24*60*60*1000).toISOString().slice(0,10) }
    });

    expect(schedRes.ok()).toBeTruthy();
    const results = await schedRes.json();
    expect(Array.isArray(results)).toBeTruthy();
  });
});
