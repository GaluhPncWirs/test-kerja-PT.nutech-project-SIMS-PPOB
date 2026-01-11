import { useEffect, useState } from "react";
import { useGetToken } from "../useGetToken/getToken";

export function useGetService() {
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<string[]>([]);
  const token = useGetToken();

  useEffect(() => {
    async function getDataUser() {
      try {
        setLoading(true);
        const req = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/services",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const res = await req.json();
        if (res) {
          setServices(res.data);
        }
      } catch (error) {
        console.error("gagal fetch api", error);
      } finally {
        setLoading(false);
      }
    }
    getDataUser();
  }, [token]);

  return {
    services,
    loading,
  };
}
