export const createState = () => {
  const state = {
    role: [] as Array<{id: number, name: string}>,
  };

  return state;
}

export type AuthState = ReturnType<typeof createState>;
