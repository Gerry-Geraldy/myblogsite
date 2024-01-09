import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fb from "./firebase";


const DB = fb.firestore();
const Blogslist = DB.collection("blogs");

const BlogEdit = () => {
  const { id } = useParams();
  const [title , SetTitle] = useState("");
  const [body , SetBody] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await Blogslist.doc(id).get();
        if (snapshot.exists) {
          const data = snapshot.data();
          SetTitle(data.Title);
          SetBody(data.Body);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id]);

 

  const submit = (e) => {
      e.preventDefault();
      // Add data to the store
      Blogslist.doc(id).update({
          Title: title,
          Body: body,
      })
      .then((docRef) => {
          alert("Data Successfully Submitted");
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
  }

  return (
    <div>
      <form onSubmit={(event) => {submit(event)}}>    
            <input type="text" placeholder="Title"  value={title}
            onChange={(e)=>{SetTitle(e.target.value)}} required />

            <textarea  name="content" type="text" placeholder="write your content here" value={body}
            rows="10" cols="150" onChange={(e)=>{SetBody(e.target.value)}} required >
            </textarea>

            <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default BlogEdit;
