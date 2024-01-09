import { useState } from "react";
import fb from "./firebase";
const DB = fb.firestore();
const Blogs = DB.collection("blogs");
// eslint-disable-next-line import/first
import { Editor } from "@tinymce/tinymce-react";
const storageRef = fb.storage().ref();

const CreateBlog = () => {
  const [title, SetTitle] = useState("");
  const [body, SetBody] = useState("");
  const [cover, setCover] = useState(null);

  const handleCoverImgChange = (e) => {
    if (e.target.files[0]) {
      setCover(e.target.files[0]);
    }
  };

  const sub = (e) => {
    e.preventDefault();
    const uploadTask = storageRef.child("images/" + cover.name).put(cover);
    uploadTask.on(
      "state change",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storageRef
          .child("images/" + cover.name)
          .getDownloadURL()
          .then((url) => {
            console.log("img url", url);
            Blogs.add({
              Title: title,
              Body: body,
              CoverImg: url,
            })
              .then((docRef) => {
                alert("Data Successfully Submitted");
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
          });
      }
    );
    // Add data to the store
  };
  return (
    <div>
      <form
        onSubmit={(event) => {
          sub(event);
        }}
      >
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => {
            SetTitle(e.target.value);
          }}
          required
        />
        <input
          type="file"
          name="covering"
          accept="image/*"
          onChange={(e) => handleCoverImgChange(e)}
        />

        {/* <textarea  name="content" type="text" placeholder="write yoyr content here" 
            rows="10" cols="150" onChange={(e)=>{SetBody(e.target.value)}} required >
            </textarea> */}

        <Editor
          textareaName="content"
          initialValue="Write your content here"
          onEditorChange={(newText) => {
            SetBody(newText);
          }}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
