import "./App.css";
import ChatBody from "./components/ChatBody";
import { NavbarDark } from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
function App() {
  const [showAddCard, setShowAddCard] = useState(false);
  const [details, setDetails] = useState(null);
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <NavbarDark
        onFriendFound={(show, friendDetails) => {
          setShowAddCard(show);
          console.log("details",friendDetails);
          setDetails(friendDetails);
        }}
      />
      <ChatBody showAddCard={showAddCard} details={details} />
    </div>
  );
}

export default App;
