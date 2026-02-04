import { useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";

const AuthSync = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  // const hasSynced = useRef(false);

  useEffect(() => {
    if (!isLoaded || !user || !isSignedIn) return;
    // if (hasSynced.current) return;

    // hasSynced.current = true;

    const syncUser = async () => {
      try {

        const token = await getToken();
        if (!token) return;

        const data = JSON.parse(localStorage.getItem("temp-profile")!)
        if (!data) {
          throw new Error("No profile data found in localstorage ")
        }

        // await user.setProfileImage(data.avatar)

        await axios.post(
          "http://localhost:5000/api/v1/users/register",
          {
            name: data.name,
            email: user.emailAddresses[0].emailAddress,
            avatar: data.avatar,
            role: data.role,
            gender: data.gender,
            dob: data.dob
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // 'Content-Type': 'multipart/form-data'
            },
          }
        );

      } catch (error: any) {
        console.error(error)
      } finally {
        localStorage.removeItem("temp-profile")
      }
    };

    syncUser();
  }, [isLoaded, user, getToken]);

  return null;
};

export default AuthSync