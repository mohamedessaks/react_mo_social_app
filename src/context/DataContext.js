import { createContext  ,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { format } from "date-fns";
import api from "../api/posts"


const DataContext = createContext({})

export const DataProvider=({children})=>{
     const [sampleposts,setSamplePosts]=useState([
      {
        id: 1,
        title: "1st post",
        datetime: "July 16, 2021 11:47:39 AM",
        body: "Welcome  to my blog...."
      },
      {
        id: 2,
        title: "Second post",
        datetime: "July 16, 2021 11:47:48 AM",
        body: "allah is most merciful and forgiving"
      }
     ])


    
  const [posts,setPosts]=useState([])  
  const [search,setSearch]=useState('')
  const [searchResult,setSearchResult]=useState([])
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate=useNavigate()
  const {width}=useWindowSize()
  const {data,fetchError,isLoading}=useAxiosFetch('http://localhost:3500/posts')
  useEffect(()=>{
    /*setPosts(data)*/
    setPosts(sampleposts)
    setSamplePosts(sampleposts)
  },[sampleposts])




  
  useEffect(()=>{
    const filteredResult = posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase())||
    ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResult(filteredResult.reverse())
  },[posts,search])

   const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try{
    const response=api.post('/posts',newPost);
    const allPosts = [...posts,(await response).data]
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate("/")
      }catch (err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.Header);
        }else{
          console.log(`Error : ${err.message}`);
      }
    }
  }

  const handleDelete = async (id) => {

    try{
      /*await api.delete(`posts/${id}`) */   
      const postlist = posts.filter(post=>post.id!==id);
      setPosts(postlist);
      navigate("/")
      } catch (err){
             console.log(`Error : ${err.message}`);
      }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try{
      /*const response = await api.put(`/posts/${id}`,updatedPost)*/
      setPosts(posts.map( post => post.id===id ? {...updatedPost}:post));
      setEditTitle(''); 
      setEditBody('');
      navigate("/")
    
      } catch (err){
             console.log(`Error : ${err.message}`);
      }

  }


    return (
        <DataContext.Provider value={{width,search,setSearch,searchResult , fetchError,data,
         isLoading,handleSubmit,postTitle,setPostTitle,setPostBody,postBody,handleDelete,posts,
         handleEdit,editBody,setEditBody,editTitle,setEditTitle }}>
            {children}
        </DataContext.Provider>

    )

}

export default DataContext;