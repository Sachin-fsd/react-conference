import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./shared/navbar/Navbar";
import { LeftSidebar } from "./shared/leftSidebar/container/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import data from './data.json';
import Home from "./pages/home/Home";
import { CustomizeTheme } from "./shared/customize/CustomizeTheme";
import React,{useState,useEffect, useCallback, useContext} from "react";
import { Login } from "./pages/login/Login";
import { UserContext } from "./shared/services/UserContext";
import { Search } from "./pages/search/Search";
import { Profile } from "./pages/profile/Profile";
import { useNavigate } from "react-router-dom";
import { Comment } from "./pages/comment/Comment";


function Layout({ children }) {
  const [isOpen,setIsOpen] = useState(false)

  let {UserDetails} = useContext(UserContext);

  if(!UserDetails){
    UserDetails = {UserID:undefined,UserDp:undefined,UserName:undefined}
  } 

  return (
    <>
      <Navbar UserDetails={UserDetails} />
      <main>
        <div className="container">
          <LeftSidebar UserDetails={UserDetails} setIsOpen={setIsOpen}/>
          {children}
          <RightSidebar UserDetails={UserDetails} messages={data.messages} users={data.users} />
          <CustomizeTheme isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
      </main>
    </>
  );
}


function App() {
  const [UserDetails,setUserDetails] = useState(null)
  // const navigate = useNavigate()

  useEffect(()=>{
    console.warn("i am here")
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
      headers:{
        // Authorization:`Bearer ${localStorage.getItem("token")}`,
        "Content-Type":"application/json"
      },
      credentials: 'include',
      method:"GET"
    }).then(res=>res.json()).then(res=>setUserDetails(res)).catch(err=>{
      console.log(err)
      // navigate("/login")
    })
  },[])

  const value = {UserDetails,setUserDetails}

  return (
    <UserContext.Provider value={value}>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={
            <Layout children={<Home />}/>
          }/>
          <Route path="/search" element={
            <Layout children={<Search />}/>
          }/>
          <Route path="/:id" element={<Layout children={<Profile />} />} />
          <Route path="/comment/:id" element={<Layout children={<Comment />} />} />
          {/* Add more routes here */}
          {/* <Route path="/profile" element={<Layout><Profile /></Layout>} /> */}
          {/* <Route path="/comment" element={<Layout><Comment /></Layout>} /> */}
        </Routes>
      </Router>
    </div>
    </UserContext.Provider>
  );
}

export default App;
