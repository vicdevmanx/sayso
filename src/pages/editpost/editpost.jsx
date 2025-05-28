import CreatePost from "../createPost/createPost";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditPost = () => {
const { id } = useParams();
const [data, setData] = useState({})
   const fetchPost = async () => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch(`https://sayso-seven.vercel.app/posts/${id}`, requestOptions);
            const result = await response.json();
            setData(result)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])


    return(
        <div className='bg-[#0e1117] text-white'>
        <CreatePost title={data.title} content={data.content} tags={typeof data.tags === 'string' && data.tags.includes(',')  ? data.tags.split(',') 
  : data.tags} category={data.category} image={data.image_url} id={id} update={true}/>
        </div>
    )
}

export default EditPost;