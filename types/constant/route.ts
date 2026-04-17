export const ROUTE = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  CONVERSATION: (idUser: string, idConversation: string) =>
    `/conversation/${idUser}/${idConversation}`,
  USER: (id: string) => `/user/${id}`,
};
