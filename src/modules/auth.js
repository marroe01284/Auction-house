import { apiLogin } from '../api/auth.js';

export async function loginUser(email, password) {
  const response = await apiLogin({ email, password });
  if (response.accessToken) {
    localStorage.setItem("accessToken", response.accessToken);
    return true;
  }
  return false;
}
