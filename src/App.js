import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBlog from "./create";
import BlogslistView from "./blogslist";
import BlogView from "./show";
import BlogEdit from "./edit";
import Signin from "./signup";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<BlogslistView />} />
          <Route path="/signin/" element={<Signin />} />
          <Route path="/Create" element={<CreateBlog />} />
          <Route path="/show/:id" element={<BlogView />} />
          <Route path="/EditBlog/:id" element={<BlogEdit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
