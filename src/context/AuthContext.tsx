import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.push('/auth/signin');
    }

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      setUser(decodedToken.sub);
    } catch (error) {        
      console.error("Failed to decode token", error);
      router.push('/auth/signin');
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);