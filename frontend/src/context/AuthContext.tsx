import React, { createContext, useState, useEffect, useContext} from 'react'

export type User ={
    id: number,
    email: string,
    role: 'admin' | 'user'
}

interface AuthContextType {
    user: User | null,
    login: (user: User, token: string) => void,
    logout: ()=>void,
    token : string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getInitialToken = () => localStorage.getItem("token");
const getInitialUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const  AuthProvider = ({children}: {children: React.ReactNode})=>{

    const [user, setUser] = useState<User | null>(getInitialUser)
    const [token, setToken] = useState<string | null>(getInitialToken)


    useEffect(()=>{
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if(storedToken && storedUser){
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    },[])

    const login = (user: User, token: string)=>{
        console.log('user obj', user)
        console.log('token', token)

        setUser(user)
        setToken(token)

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
    }


    const logout = ()=>{
        setUser(null)
        setToken(null)

        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
        {children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};