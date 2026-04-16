export const ROUTE = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  CONVERSATION: (id: string) => `/conversation/${id}`,
  USER: (id: string) => `/user/${id}`,
};
