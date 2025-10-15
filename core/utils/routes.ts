export const routes = {
  login: '/login',
  home: '/home',
  profile: (id: string) => `/users/${id}`,
} as const;


