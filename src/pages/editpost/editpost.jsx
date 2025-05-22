import CreatePost from "../createPost/createPost";
import { useParams } from "react-router-dom";

const EditPost = () => {
const { id } = useParams();


const [data, setData] = useState({})
 const fetchPost = async () => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch(`https://sayso-seven.vercel.app/api/posts/${id}`, requestOptions);
            const result = await response.json();
            console.log(result)
            setData(result)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPost()
    },[])


    return(
        <div className='bg-[#0e1117] text-white'>
        <CreatePost title={data.title} content={data.content} tags={data.tags} category={data.category} image={data.image_url} id={id}/>
        </div>
    )
}

export default EditPost;