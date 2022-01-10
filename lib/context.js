import { createContext } from 'react';
export const UserContext = createContext({ user: null, username: null });


import { useRouter } from 'next/router';

export function redirectTo(redirectPath) {
  const router = useRouter();

  router.push(redirectPath);
}