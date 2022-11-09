import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext(); 
export const AuthConsumer = AuthContext.Consumer;

export function AuthProvider({children}){
  // state={
  //   adminUsername: "",
  //   isAuthenticated: false,
  //   authData: {}
  // }
  const [AdminUsername, setAdminUsername] = useState('');
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const [AuthData, setAuthData] = useState([]);
  
  // function LogIn(props) {
  //   }

  const LogIn = (props) => {
    setAdminUsername(props);
    setIsAuthenticated(true);
    // useEffect(() => {
      
      localStorage.setItem('auth', JSON.stringify({
        adminUsername: props,
        isAuthenticated: true
        // AuthData
      }));
    // }, [AuthData]);
    // setAuthData(JSON.parse(localStorage.getItem('auth')))
    // return AdminUsername;
  }

  
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('auth'));
    if (authData) {
      setAuthData(authData); 
    }
  }, []);

  const LogOut = () => {
    setAdminUsername("");
    setIsAuthenticated(false);
    localStorage.setItem('auth', JSON.stringify({
      adminUsername: '',
      isAuthenticated: false
    }))
    window.location.assign("/admin");
    return console.log(AuthData.adminUsername);
  }


    return(
      <AuthContext.Provider value={{
        AdminUsername,
        IsAuthenticated, 
        LogIn,
        LogOut,
        AuthData
      }}> 
        {children}
      </AuthContext.Provider>
    )
}

export default AuthContext; 
