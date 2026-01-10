import { useEffect, useState } from "react";
import { useGetToken } from "../useGetToken/getToken";
import { fetchApi } from "../../services/api";

type dataUser = {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
};

export function useGetDataUser() {
  const [dataUser, setDataUser] = useState<dataUser | null>(null);
  const token = useGetToken();

  useEffect(() => {
    async function getDataUser() {
      try {
        const req = await fetchApi("/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const res = await req.json();

        if (!res) {
          alert("Token tidak tidak valid atau kadaluwarsa");
        } else {
          setDataUser(res.data);
        }
      } catch (error) {
        console.error("gagal fetch api", error);
      }
    }
    getDataUser();
  }, [token]);

  return dataUser;
}
