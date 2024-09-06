import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useRouter } from "next/navigation";
import { AdminUser } from "@/types/user";

interface AuthContextType {
  user: AdminUser | null;
  setUser: React.Dispatch<React.SetStateAction<AdminUser | null>>;
}

const defaultContextValue: AuthContextType = {
  user: null,
  setUser: () => {},
}

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthProvider = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token: string | null = localStorage.getItem('access_token');

    try {
      if (!token) {
        router.push('/auth/signin');
      } else {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const subject = JSON.stringify(decodedToken.sub);
        console.log("+++++++++++++++++++++++++", subject)
        setUser(JSON.parse(subject));
      }
    } catch (error) {
      router.push('/auth/signin');
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);