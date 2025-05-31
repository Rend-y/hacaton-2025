import axios from 'axios';

// Получение JWT токена по username и password
export async function getToken(username: string, password: string): Promise<{ access: string, refresh: string }> {
  const response = await axios.post<{ access: string, refresh: string }>('/token/', {
    username,
    password,
  });
  return response.data;
}

// Обновление access-токена по refresh-токену
export async function refreshToken(refresh: string) {
  const response = await axios.post('/token/refresh/', {
    refresh,
  });
  return response.data;
}

// Проверка валидности токена
export async function verifyToken(token: string) {
  const response = await axios.post('/token/verify/', {
    token,
  });
  return response.data;
}
