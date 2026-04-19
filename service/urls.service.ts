export const URLS = {
  // auth
  LOGIN: "auth/login",

  // user
  REGISTER: "user/create-new-user",
  GET_LIST_USER: "user/get-list-user",
  GET_USER_BY_ID: (id: number) => `user/get-user-by-id/${id}`,

  //message
  GET_LIST_MESSAGES: (id: number) => `message/get-list-messages/${id}`,
  UPDATE_STATUS_MESSAGE: (id: number) => `message/update-status-message/${id}`,

  //conversation
  GET_LIST_CONVERSATION: "conversation/get-list-conversation",
  GET_LIST_USER_CONVERSATION: "conversation/get-list-user-conversation",
  CHECK_CONVERSATION: "conversation/check-conversation",
};
