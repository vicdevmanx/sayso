import CreatePost from "../createPost/createPost";
import { useParams } from "react-router-dom";

const EditPost = () => {
const { id } = useParams();


    return(
        <div className='bg-[#0e1117] text-white'>
        <CreatePost title='test' content='test' tags={['tag1', 'tag2']} category='test' image={null}/>
        </div>
    )
}

export default EditPost;