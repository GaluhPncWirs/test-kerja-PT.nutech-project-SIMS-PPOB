import { useState } from "react";

export function useGetToken() {
  const [token] = useState(() => {
    return localStorage.getItem("loginToken");
  });
  return token;
}
