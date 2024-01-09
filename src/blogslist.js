import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fb from "./firebase";
const DB = fb.firestore();
const Blogslist = DB.collection("blogs");

const BlogslistView = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = Blogslist.limit(100).onSnapshot((querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setBlogs(data);
    });

    // Detach listener
    return () => unsubscribe();
  }, []);
  const DeleteBlog = (id) => {
    Blogslist.doc(id)
      .delete()
      .then(() => {
        alert("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const searchBlog = (e) => {
    e.preventDefault();
    setBlogs(
      blogs.filter(
        (blogs) =>
          blogs.Title.toLowerCase().includes(search.toLowerCase()) ||
          blogs.Body.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          searchBlog(e);
        }}
      >
        <input onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <p>Title: {blog.Title}</p>
          <p>Body: {blog.Body}</p>
          {blog.CoverImg ? (
            <>
              <img src={blog.CoverImg} alt="cover" />
            </>
          ) : null}{" "}
          <Link to={"/show/" + blog.id}>View</Link>
          <Link to={"/EditBlog/" + blog.id}>Edit</Link>
          <button
            onClick={() => {
              DeleteBlog(blog.id);
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogslistView;
