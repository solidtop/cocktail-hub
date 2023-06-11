import { useContext } from "react";
import { UserContext } from "../components/UserProvider";

export default function useUser() {
  const { user, loading, login, logout, register } = useContext(UserContext);

  return {
    user,
    loading,
    login,
    logout,
    register,
  };
}
