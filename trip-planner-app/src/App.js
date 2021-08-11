import React from "react";
import "./App.scss";
import Nav from "./components/layout/Nav/Nav";
import Main from "./components/layout/Main/Main";
import Footer from "./components/layout/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
