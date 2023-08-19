import { useState } from "react";
import { useNavigate } from "react-router-dom"; //ticks to quotes

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

   fetch('http://localhost:3000/blogs/', {
    method: 'POST',
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify(blog)
   }).then(() => {
    console.log('new blog added');
    setIsPending(false);
    //navigate(-1) redirects back to the prior page after adding blog
    navigate('/'); // add .push?
   })

   
  }

    return ( 
       <div className="create">
        <h2>Add a New Blog</h2>
        <form onSubmit={handleSubmit}>
          <label>Blog title:</label>
          <input 
          type= "text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog body:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <label>Blog author:</label>
          <select
             value={author}
             onChange={(e) => setAuthor(e.target.value)}
            >
            <option value= "mario">mario</option>
            <option value= "yoshi">yoshi</option>
          </select>
          { !isPending && <button>Add Blog</button>}
          { isPending && <button disabled>Adding blog...</button>}
          <p>{ title }</p>
          <p>{ body }</p>
          <p>{ author }</p>
        </form>
       </div> 
     );
}
 
export default Create;