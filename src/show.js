import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fb from "./firebase";
import DOMPurify from 'dompurify';

const DB = fb.firestore();
const Blogslist = DB.collection("blogs");

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({ Title: "", Body: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await Blogslist.doc(id).get();
        if (snapshot.exists) {
          const data = snapshot.data();
          setBlog(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id]);

  // Menempatkan sanitasi konten di dalam useEffect untuk memastikan blog.Body sudah terisi sebelum membersihkannya
  useEffect(() => {
    if (blog.Body) {
      const sanitizedHTML = DOMPurify.sanitize(blog.Body);
      setBlog((prevBlog) => ({ ...prevBlog, Body: sanitizedHTML }));
    }
  }, [blog.Body]);

  return (
    <div>
      <p>Title : {blog.Title}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.Body }} />
    </div>
  );
};

export default BlogView;
