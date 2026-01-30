import { useEffect, useRef } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";

export const AuthSync = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (hasSynced.current) return;

    hasSynced.current = true;

    const syncUser = async () => {
      const token = await getToken();
      if (!token) return;

      await axios.post(
        "http://localhost:5000/api/v1/auth/profile",
        {
          name: user.fullName,
          email: user.emailAddresses[0].emailAddress,
          avatar: user.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    };

    syncUser();
  }, [isLoaded, user, getToken]);

  return null;
};
