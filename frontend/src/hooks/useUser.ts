import { useEffect, useState } from "react";
import { api } from "../services/api";
import { userSchema } from "../schemas/user.schema";
import type { User } from "../schemas/user.schema";

export function useUser(username?: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(false);

        const response = await api.get(`/users/${username}`);
        const parsed = userSchema.parse(response.data);

        setUser(parsed);
      } catch {
        setError(true);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchUser();
    }
  }, [username]);

  return { user, loading, error };
}