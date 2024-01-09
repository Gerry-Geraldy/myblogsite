import BlogslistView from "./blogslist";
import { Link } from "react-router-dom";

import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Link to={'/signin/'}>Signin</Link>
      <BlogslistView/>
    </div>
  )
}

export default HomePage