export const createState = () => {
  const state = {
    count: 0,
    isLogin: false,
  };

  return state;
}

export type UserState = ReturnType<typeof createState>;
