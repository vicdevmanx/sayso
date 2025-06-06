import { MoreHorizontal, Search, ThumbsUp, User, ThumbsDown, MessageCircleMore, Link, Filter, X, Pencil, Trash, Share, Link2, Share2, Send, ArrowBigUp, ArrowRight, ArrowDown, ArrowUp, SearchSlash, PlusCircle, Plus, LogOut, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import sayso from '../../assets/sayso assets/sayso.png'
import clsx from 'clsx'
import { Pagination, useMediaQuery } from "@mui/material";
import ModalTrigger from "../components/authtrigger";
import AuthForm from "../components/authform";
import Drawer from '@mui/material/Drawer';
import { useState, useRef, useEffect, use } from 'react'
import { Toaster, toast } from 'sonner'
import imageOne from '../../assets/logo2.jpg'
import './home.css'
import InfoDisplay from "../components/trigger";
import { useNavigate } from 'react-router-dom'
import heroImg from '../../assets/hero.png'
import Loader from "@/assets/loader/loader";
import { useContext } from "react";
import { GlobalContext } from "@/components/functional/context";
import { PostSkeleton } from "../components/postskeleton";
import defaultProfile from '../../assets/default.webp'
import CommentSkeleton from "../components/commentSkeleton";
import logo from '../../assets/sayso assets/saysologo.png'

function FullPageInfo({ username, profilepic, readtime, date, title, tags, postImg, likes, comment, id, content }) {
    const isMobile = useMediaQuery('(max-width: 720px)');
    const navigate = useNavigate()
    const [allComments, setAllComments] = useState([])

    const fetchComments = async () => {


        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const response = await fetch(`https://sayso-seven.vercel.app/posts/${id}/comments`, requestOptions)
            const result = await response.json();

            if (result.length === 0) {
                setAllComments([{ content: 'No comments yet', info: 'Be the first to comment', users: { username: 'SaySo' } }])
            } else setAllComments(result)
        }
        catch (err) {
            console.log(err)
        }
    }
    const [commentInput, setCommentInput] = useState('')
    const [commentLoad, setCommentLoad] = useState(false)

    const addComments = async () => {
        if (!commentInput) return toast('say something');
        if (!localStorage.getItem('authToken')) return toast('Please login to comment');
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('authToken')}`);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ content: commentInput }),
            redirect: 'follow'
        };

        try {
            setCommentLoad(true)
            const response = await fetch(`https://sayso-seven.vercel.app/posts/${id}/comments`, requestOptions)
            const result = await response.json();
            toast('Comment added successfully');
            setCommentInput('');
            await fetchComments()
            setCommentLoad(false)
        }
        catch (err) {
            console.log(err)
            setCommentLoad(false)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])
    const [trashLoading, setTrashLoading] = useState(false)
    return (
        <div className={clsx('flex', isMobile ? 'p-0' : 'p-2', 'gap-2', 'text-white')}>
            {isMobile ? <></> :
                <Post username={username} profilepic={profilepic} readtime={readtime} date={date} title={title} tags={tags} postImg={postImg} likes={likes} comment={comment} review={true} id={id} content={content.slice(0, 120) + '...'} />
            }

            <div className='flex flex-col gap-1'>
                <p className='font-[poppins-bold] text-lg px-2' style={{ textAlign: isMobile ? 'center' : 'left' }}>Comments</p>

                <div className={clsx(' flex gap-1 w-screen px-2 flex-col items-end relative', isMobile ? 'max-w-120' : 'max-w-88')}> <textarea
                    className='bg-[#272b34] rounded-xl w-full py-3 px-4 outline-0 transition text-sm pr-28 handleScroll'
                    placeholder='Say something...'
                    name="commentInput"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                /><div className="absolute bottom-2 right-4"> {commentLoad ? <Button className={'bg-gradient-to-r from-[#6c5ce7] to-[#958aec] px-2 py-1 rounded-xl flex items-center justify-center gap-1.5 text-sm'}><Loader size={12} /> Sending...</Button> : <Button className={commentInput ? 'bg-gradient-to-r from-[#6c5ce7] to-[#958aec] px-4 py-1 rounded-xl text-sm' : 'bg-[#1c1f26] px-4 py-1 text-sm rounded-xl'} onClick={addComments} >Comment</Button>}</div> </div>


                <div className={clsx('rounded-xl', isMobile ? 'w-full' : 'w-90', 'overflow-scroll', 'h-100', 'flex', 'flex-col', 'gap-2', 'handleScroll', 'pb-12', 'p-2')}>

                    {allComments.length > 0 ? allComments.map(comment =>
                        <div className='flex flex-col gap-2 font-[poppins] text-[13px] w-full'>
                            <div className='border-2 border-[#272b34] rounded-lg p-2 flex gap-2 w-full relative'>
                                {!comment.info && <span className='w-8 h-8 min-w-8 rounded-full bg-[#272b34] overflow-hidden flex items-center'>
                                    <img src={comment?.users?.profile_image_url || defaultProfile} className='object-cover h-full' loading="lazy" />
                                </span>}

                                <p className='leading-snug max-w-176'>
                                    {!comment.info && <div className='flex items-center gap-2 justify-start'>
                                        <div className='flex gap-1.5 items-center'>
                                            <span className='font-[poppins-bold] w-full text-sm'>{comment?.users?.username}</span>
                                            <span className="circle"></span>
                                            <span className='text-[#ffffff90] text-xs'> {new Date(comment.created_at).toLocaleDateString()}</span>
                                        </div><br /></div>}
                                    <span className="w-full">{comment?.content}</span> <br />
                                    {comment.user_id == localStorage.getItem('userId') ?
                                        <span className='flex items-center text-[#ffffff90] gap-1 cursor-pointer relative my-2'>
                                            <div className="active:bg-[#272b34] hover:bg-[#272b34] p-1 rounded-full">
                                                <Pencil className='size-4.5' />
                                            </div>
                                            {trashLoading ?
                                                <Loader size={15} />
                                                : <div className="active:bg-[#272b34] hover:bg-[#272b34] p-1 rounded-full">

                                                    <Trash className='size-4.5' onClick={async () => {
                                                        try {
                                                            var myHeaders = new Headers();
                                                            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('authToken')}`);

                                                            var requestOptions = {
                                                                method: 'DELETE',
                                                                headers: myHeaders,
                                                                redirect: 'follow'
                                                            }
                                                            setTrashLoading(true)
                                                            const response = await fetch(`https://sayso-seven.vercel.app/comments/${comment.id}`, requestOptions);
                                                            const result = await response.json();
                                                            console.log(result);
                                                            toast('Comment deleted successfully');
                                                            setTrashLoading(false)
                                                            await fetchComments();


                                                        } catch (err) {
                                                            console.log(err)
                                                        }
                                                    }} /></div>}
                                        </span>


                                        : <span>{comment?.info || ''}</span>
                                    }
                                </p>

                            </div>
                        </div>
                    ) : <CommentSkeleton />}

                </div>

            </div>

        </div>
    );

}

export function More({ id }) {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center gap-4 font-[poppins-medium] p-6'>
            <p className='text-white font-[poppins-bold]'>What do you Wanna do?</p>
            <div className='flex gap-2 text-md text-white'>
                <Button className='flex gap-1 items-center bg-[#272b34]' onClick={() => navigate(`/editPost/${id}`)}><Pencil className='size-4' /> <p>Edit Post</p></Button>
                <Button className='flex gap-1 items-center bg-[#272b34]' onClick={() => {
                    if (window.confirm('Are you sure you want to delete this post?')) {
                        fetch(`https://sayso-seven.vercel.app/posts/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                toast('Post deleted successfully');
                                navigate('/');
                            })
                            .catch(error => {
                                console.error('Error deleting post:', error);
                                toast.error('Failed to delete post');
                            });
                    }
                }}><Trash className='text-red-500 size-4' /> <p>Delete Post</p></Button>
            </div></div>
    );

}

export const Post = ({ username, profilepic, readtime, date, title, tags, postImg, likes, comment, review, id, content, myprofile = false, category, allLikes = [] }) => {
    const isMobile = useMediaQuery('(max-width: 460px)');
    const [liked, setLiked] = useState(localStorage.getItem('userId') && allLikes.find(id => localStorage.getItem('userId') == id))
    const [dislike, setDisLiked] = useState(false)
    const [msgOpen, setMsgOpen] = useState(false)
    const navigate = useNavigate();
    const { state } = useContext(GlobalContext);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            toast.success('Link Copied to clipboard!')
        } catch (err) {
            toast.error('Failed to copy')
        }
    }
    const [updatedLikeCount, setUpdatedLikeCount] = useState(likes || 0)
    const handleSendLike = async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('authToken')}`);

        var raw = "null";

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        liked ? setLiked(false) :
            setLiked(true);

             liked ? toast.success('post unliked!',  {duration: 1000}) :
            toast.success('post liked!', {duration: 1000});

        liked ? setUpdatedLikeCount(updatedLikeCount - 1) :
            setUpdatedLikeCount(updatedLikeCount + 1)

        try {
            const response = await fetch(`${state.url}/posts/${id}/like`, requestOptions);
            const result = await response.json();
            // console.log(result);
            liked ? setLiked(false) :
                setLiked(true);
            setUpdatedLikeCount(result.likeCount)
            console.log(result.likeCount)
            // toast(result.message)
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (

        <div className={clsx('bg-[#1c1f26] ', review ? 'border-[0px]' : 'border-[1.5px]', 'border-[#272b34]', 'hover:border-[#444455]', 'hover:bg-[#1f2429]', 'cursor-pointer', 'transition', 'rounded-2xl', 'flex', 'flex-col justify-between', 'gap-2.5', 'pb-2.5', 'parent', isMobile ? 'w-full' : 'w-78', review ? 'w-92' : '')} style={{}}>
            <div className='p-3 pb-0 flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-[#0e1116] w-9 h-9 rounded-full flex justify-center items-center cursor-pointer transition hover:bg-[#1c1f26] overflow-hidden'>{<img src={profilepic || defaultProfile} loading="lazy" className='object-cover h-full' /> || <User size={18} />}</div>
                    <div className=" text-[#bbbbcc] font-[poppins-medium] flex flex-col -gap-1.5">
                        <p className="text-white text-[13px]">{username}</p>
                        <p className='flex items-center gap-1.5 text-xs'>{date}<span className='circle'></span> {readtime} read </p>
                    </div>
                </div>
                <div className='flex cursor-pointer items-center gap-1 active:bg-[#272b34] hover:bg-[#272b34] p-2 rounded-xl'>
                    {myprofile ? <InfoDisplay
                        info={More}
                        infoProps={{ id }}
                        trigger={<MoreHorizontal size={18} className="text-[#bbbbcc] cursor-pointer transition" />}
                    /> : <></>}
                </div>
            </div>
            <div className='p-3 pb-0 pt-0 flex flex-col gap-2'>
                <h2 className="font-[poppins-bold] text-lg leading-snug h-13 text-white overflow-hidden" onClick={() => navigate(`/post/${id}`)}>{title?.slice(0, 52)}{title.length >= 52 ? '...' : ''}</h2>
                {review ? <h2 className="font-[poppins-medium] text-sm leading-snug h-15 text-white flex gap-1 hover:underline cursor-pointer" onClick={() => navigate(`/post/${id}`)}>{content || "couldn't load"} See More</h2> : ''}
                <div className='flex items-center gap-2 w-full overflow-scroll handleScroll max-w-76'>
                    {tags ? typeof tags !== 'string' ? tags?.map(tag =>
                        <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer'>#{tag}</p>
                    ) : <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer'>#{tags}</p>
                        : <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer'>notag</p>}

                </div>
            </div>
            <div className='p-2 pt-0 pb-0'>
                <div className={clsx('rounded-lg', 'w-full', isMobile ? 'h-46' : 'h-36', review ? 'h-40' : '', 'bg-[#272b34]', 'overflow-hidden relative')} onClick={() => navigate(`/post/${id}`)}>
                    <img loading="lazy" src={postImg || imageOne} className='object-cover h-full w-full' />
                    <div className='absolute right-1 bottom-1 rounded-lg bg-[#1c1f26] font-[poppins-medium] flex items-center justify-center py-1 px-2 text-xs'>{category}</div>

                </div>
            </div>
            <div className='px-2 select-none'>
                <div className='w-full b-0 h-full flex relative items-center gap-4'>
                    <div className='bg-[#272b34] rounded-xl flex gap-1 items-center cursor-pointer'>

                        <span className='flex gap-2 p-2 py-1.5 items-start rounded-xl hover:bg-[#3B82F650] active:bg-[#3B82F650] transition' onClick={() => { setDisLiked(false); handleSendLike(id) }}>
                            {liked && !dislike ? <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='size-5 cursor-pointer fill-blue-500 stroke-[#3B82F6]'><path d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"></path></svg>
                                : <ThumbsUp onClick={() => {

                                }} className='size-5 cursor-pointer stroke-[#bbbbcc] stroke-2 fill-transparent ' />

                            }<p className='text-[#bbbbcc] font-[poppins-medium] text-[15px]' style={{ color: liked && !dislike ? '#3B82F6' : '#bbbbcc' }}>{updatedLikeCount}</p>
                        </span>
                        <span className='p-2 py-1.5 rounded-xl hover:bg-[#EF444450] active:bg-[#EF444450] transition'>
                            {!dislike ? <ThumbsDown onClick={() => setDisLiked(true)} className='size-5 cursor-pointer stroke-[#bbbbcc] stroke-2 fill-transparent' />
                                : <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='size-5 cursor-pointer fill-red-500 stroke-[#EF4444]' onClick={() => setDisLiked(false)}><path d="M19 15h4V3h-4m-4 0H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2a2 2 0 0 0 2 2h6.31l-.95 4.57c-.02.1-.03.2-.03.31c0 .42.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5a2 2 0 0 0-2-2"></path></svg>
                            }
                        </span>
                    </div>
                    {review ? <div className='flex items-center gap-1 cursor-pointer active:bg-[#272b34] hover:bg-[#272b34] p-2 py-1.5 rounded-xl' onClick={() => setMsgOpen(!msgOpen)}>
                        <MessageCircleMore className='size-5 cursor-pointer stroke-[#bbbbcc]' />   <p className='text-[#bbbbcc] font-[poppins-medium] text-[15px]'>{comment || 0}</p>
                    </div> :
                        <InfoDisplay
                            info={FullPageInfo}
                            infoProps={{ username, profilepic, readtime, date, title, tags, postImg, likes, comment, id, content }}
                            trigger={<div className='flex items-center gap-1 cursor-pointer active:bg-[#272b34] hover:bg-[#272b34] p-2 py-1.5 rounded-xl' onClick={() => setMsgOpen(!msgOpen)}>
                                <MessageCircleMore className='size-5 cursor-pointer stroke-[#bbbbcc]' />   <p className='text-[#bbbbcc] font-[poppins-medium] text-[15px]'>{comment}</p>
                            </div>}
                        />
                    }
                    <div className='flex cursor-pointer items-center gap-1 active:bg-[#272b34] hover:bg-[#272b34] p-2 py-1.5 rounded-xl'>
                        <Share className='size-5 cursor-pointer stroke-[#bbbbcc]' onClick={() => copyToClipboard(`https://sayso-gules.vercel.app/post/${id}`)} />
                    </div>
                    <p className='bg-white rounded-lg p-1.5 py-1 absolute right-0 text-black text-[13px] items-center gap-1 font-[poppins-medium] readMore' onClick={() => navigate(`/post/${id}`)}> Read
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </p>
                </div>

            </div>
        </div>
    )
}

const Home = () => {
    const postRef = useRef(null);
    const heroRef = useRef(null);

    const scrollToPosts = () => {
        postRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const scrollToHero = () => {
        heroRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const [onHero, setOnHero] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            const heroY = heroRef.current?.getBoundingClientRect().top || 0;
            setOnHero(heroY > -200); // adjust threshold
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);


    const isMobile = useMediaQuery('(max-width: 460px)');
    const [AuthActive, setAuthActive] = useState(false);

    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleInputRef = () => {
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0);
        setIsFocused(true)
        scrollToPosts()
    }



    const startData = [
        {
            username: "JohnDoe",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "5 min",
            date: "2023-10-01",
            postTitle: "Understanding JavaScript Closures",
            tags: ["#javascript", "#programming", "#webdev"],
            postImage: 'https://app.daily.dev/posts/20-mern-stack-projects-that-will-guarantee-you-a-job-in-2025-m3rrf6vs1',
            likes: 12,
            comments: 4,
        },
        {
            username: "JaneSmith",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "3 min",
            date: "2023-10-02",
            postTitle: "A Guide to Python Decorators",
            tags: ["#python", "#coding", "#tutorial"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 8,
            comments: 2,
        },
        {
            username: "DevGuru",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "7 min",
            date: "2023-10-03",
            postTitle: "React vs Vue: Which One to Choose?",
            tags: ["#react", "#vue", "#frontend"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 20,
            comments: 10,
        },
        {
            username: "CodeMaster",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "6 min",
            date: "2023-10-04",
            postTitle: "10 Tips for Writing Clean Code",
            tags: ["#coding", "#bestpractices", "#software"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 15,
            comments: 5,
        },
        {
            username: "Techie",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "4 min",
            date: "2023-10-05",
            postTitle: "Exploring the New Features in ES2023",
            tags: ["#javascript", "#es2023", "#webdev"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 10,
            comments: 3,
        },
        {
            username: "CoderGirl",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "5 min",
            date: "2023-10-06",
            postTitle: "How to Build a REST API with Node.js",
            tags: ["#nodejs", "#api", "#backend"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 18,
            comments: 7,
        },
        {
            username: "FrontendFan",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "6 min",
            date: "2023-10-07",
            postTitle: "CSS Grid vs Flexbox: When to Use Which?",
            tags: ["#css", "#frontend", "#webdesign"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 14,
            comments: 6,
        },
        {
            username: "BackendBoss",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "8 min",
            date: "2023-10-08",
            postTitle: "Understanding Database Indexing",
            tags: ["#database", "#sql", "#backend"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 22,
            comments: 9,
        },
        {
            username: "AIEnthusiast",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "7 min",
            date: "2023-10-09",
            postTitle: "Introduction to Machine Learning",
            tags: ["#ai", "#ml", "#datascience"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 25,
            comments: 12,
        },
        {
            username: "WebWizard",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "5 min",
            date: "2023-10-10",
            postTitle: "Top 5 JavaScript Frameworks in 2023",
            tags: ["#javascript", "#frameworks", "#webdev"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 30,
            comments: 15,
        },
        {
            username: "DataDiva",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "6 min",
            date: "2023-10-11",
            postTitle: "Data Visualization with D3.js",
            tags: ["#d3js", "#dataviz", "#javascript"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 12,
            comments: 4,
        },
        {
            username: "CloudCoder",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "7 min",
            date: "2023-10-12",
            postTitle: "Getting Started with AWS Lambda",
            tags: ["#aws", "#cloud", "#serverless"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 18,
            comments: 6,
        },
        {
            username: "DevOpsPro",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "8 min",
            date: "2023-10-13",
            postTitle: "CI/CD Pipelines Explained",
            tags: ["#devops", "#cicd", "#automation"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 20,
            comments: 8,
        },
        {
            username: "MobileMaker",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "5 min",
            date: "2023-10-14",
            postTitle: "Building Your First React Native App",
            tags: ["#reactnative", "#mobile", "#development"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 16,
            comments: 5,
        },
        {
            username: "SecuritySage",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "6 min",
            date: "2023-10-15",
            postTitle: "Best Practices for Web Security",
            tags: ["#security", "#webdev", "#bestpractices"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 14,
            comments: 7,
        },
        {
            username: "GameDev",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "7 min",
            date: "2023-10-16",
            postTitle: "Introduction to Unity Game Development",
            tags: ["#gamedev", "#unity", "#programming"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 19,
            comments: 9,
        },
        {
            username: "TechExplorer",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "5 min",
            date: "2023-10-17",
            postTitle: "Exploring the Internet of Things (IoT)",
            tags: ["#iot", "#technology", "#innovation"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 10,
            comments: 3,
        },
        {
            username: "FullStackFan",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "6 min",
            date: "2023-10-18",
            postTitle: "Understanding the MERN Stack",
            tags: ["#mern", "#fullstack", "#webdev"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 22,
            comments: 11,
        },
        {
            username: "AIResearcher",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "8 min",
            date: "2023-10-19",
            postTitle: "Deep Learning Basics",
            tags: ["#ai", "#deeplearning", "#datascience"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 28,
            comments: 14,
        },
        {
            username: "TechBlogger",
            profilePicture: "https://via.placeholder.com/150",
            readTime: "4 min",
            date: "2023-10-20",
            postTitle: "How to Start a Tech Blog",
            tags: ["#blogging", "#tech", "#writing"],
            postImage: "https://via.placeholder.com/600x200",
            likes: 12,
            comments: 5,
        }
    ]

    const [data, setData] = useState(null);

    const [filterOpen, setFilterOpen] = useState(false);
    const filter = () => {
        setFilterOpen(!filterOpen)
    }



    const [SelectedTag, setSelectedTag] = useState(null)
    const [SelectedCategory, setSelectedCategory] = useState(null)
    const [searchLoading, setSearchLoading] = useState(false);
    const [postsExists, setPostsExists] = useState(true);
    const [GeneralLoading, setGeneralLoading] = useState(false);
    const fetchPosts = async (filter = '', category = '', tag = '') => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            setGeneralLoading(true);
            const response = await fetch("https://sayso-seven.vercel.app/posts", requestOptions);
            const result = await response.json();
            filter && setData(result.filter(post => post.tags.toLowerCase().includes(filter.toLowerCase().trim()) || post.category.toLowerCase() === filter.toLowerCase().trim() || post.title.toLowerCase().includes(filter.toLowerCase().trim())))
            category && tag && setData(result.filter(post => post.category.toLowerCase() === category.toLowerCase().trim() && post.tags.toLowerCase().includes(tag.toLowerCase().trim())))
            category && setData(result.filter(post => post.category.toLowerCase() === category.toLowerCase().trim()))
            tag && setData(result.filter(post => post.tags.toLowerCase().includes(tag.toLowerCase().trim())))

            !filter && !category && !tag && setData(result)
            setGeneralLoading(false);
        } catch (err) {
            console.log(err)
            setGeneralLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts()
    }, []);



    const { state } = useContext(GlobalContext);
    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem('authToken') ? state.user : null
    );
    useEffect(() => {
        fetchUser(localStorage.getItem('userId'));
    }, []);

    const fetchUser = async (id) => {
        if (!id) return;

        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const response = await fetch(state.url + `/users/${id}/profile`, requestOptions);
            const result = await response.json();
            setCurrentUser(result.user); // ✅ Properly update state
        } catch (err) {
            console.log(err);
        }
    };
    const [filterLoading, setFilterLoading] = useState(false);
    const FilterUI = ({ setSelectedCategory, setSelectedTag, setFilterLoading, handleClose, SelectedCategory, SelectedTag }) => {
        const [category, setCategory] = useState('');
        const [tag, setTag] = useState('');
        useEffect(() => {
            setCategory(SelectedCategory || '');
            setTag(SelectedTag || '');
        }, []);
        return (
            <div className="flex flex-col gap-4 text-white font-[poppins] p-4 w-screen max-w-md bg-[#1c1f26] rounded-xl">
                <input type="text" placeholder="Filter by Category" className="p-3 py-2 rounded-md outline-0 focus:border-white transition border border-[#272b34] w-full"
                    name='category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input type="text" placeholder="Filter by Tag" className="p-3 py-2 rounded-md outline-0 focus:border-white transition border border-[#272b34] w-full"
                    name='tag'
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />

                <Button className='w-full bg-gradient-to-r from-[#6c5ce7] to-[#958aec] py-6'
                    onClick={() => {
                        if (category || tag) {
                            setSelectedCategory(category);
                            setSelectedTag(tag);
                            setFilterLoading(true);
                            fetchPosts('', category, tag).then(() => {

                                setFilterLoading(false)
                                setSearchLoading(false)

                            });
                            handleClose();
                        } else {
                            toast('Please select a category or tag to filter');
                            return;
                        }
                    }}
                > Filter</Button>
            </div>
        )
    }

    useEffect(() => {
        const hasPosts =
            Array.isArray(data) ? data.length > 0 :
                typeof data === 'object' && data !== null ? Object.keys(data).length > 0 :
                    Boolean(data);
        setPostsExists(hasPosts);


    }, [data]);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // Calculate paginated posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data && data.slice(indexOfFirstPost, indexOfLastPost);
    const [searchVal, setSearchVal] = useState('');
    return (
        <div>
            <div className='flex justify-between items-center p-3 py-2 border-b border-[#1c1f26] backdrop-blur-sm sticky top-0 bg-[#0e1116cc] z-1000 h-15'>
                <h1 className='font-[poppins-bold] text-xl select-none'><img src={sayso} alt='saysologo' className='w-24' /></h1>
                <div className='flex gap-2 items-center'>
                    {
                        isFocused && (
                            <div className={`${isMobile ? 'right-2' : 'right-14'} absolute InputAni min-lg:InputAni2 max-w-xl`}>
                                <input
                                    ref={inputRef}
                                    onBlur={() => setIsFocused(false)}
                                    type='text'
                                    placeholder='Search Posts...'
                                    className={` text-sm bg-[#262a35] rounded-xl p-3 pl-4 outline-0 w-full`}
                                    onInput={async (e) => {
                                        const filter = e.target.value;
                                        setSearchLoading(true);
                                        setSearchVal(filter)
                                        fetchPosts(filter).then(() => {
                                            setSearchLoading(false)

                                        });
                                    }}
                                />
                                {searchLoading && (
                                    <div className='absolute right-2 top-1/2 -translate-y-1/2'>
                                        <Loader size={24} />
                                    </div>
                                )}
                            </div>

                        )
                    }

                    {
                        !isFocused && (
                            <Button variant="ghost" className='cursor-pointer transition hover:bg-[#1c1f26] active:bg-[#1c1f26] rounded-xl h-11 w-11' onClick={handleInputRef}>
                                <Search size={34} />
                            </Button>
                        )
                    }
                    {currentUser ? <div className='w-9 h-9 rounded-full cursor-pointer overflow-hidden flex items-center' onClick={() => navigate('/profile')}><img className='aspect-auto object-cover h-full' src={currentUser.profile_image_url || defaultProfile} /></div>
                        : <> {localStorage.getItem('authToken') ? <Loader size={16} onClick={() => navigate('/profile')} /> : <div className='bg-[#1c1f26] w-9 h-9 rounded-full flex justify-center items-center cursor-pointer transition hover:bg-[#1c1f26]' onClick={() => setAuthActive(true)}> <User size={18} /></div>}</>
                    }</div>
            </div>
            <div ref={heroRef} className="-mt-16 absolute"></div>
            <div className='w-full h-[100vh] bg-cover bg-center flex items-center flex-col gap-4 justify-center relative' loading="lazy" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className='absolute bg-[#000000aa] insert-0 w-full h-full' ></div>
                {/* <div className='bg-transparent w-14 h-14 z-20 absolute top-28 left-1/2 transform -translate-x-1/2 rounded-full flex items-center justify-center transition-all duration-300 pulse-ring'></div>
                <div className='bg-transparent w-14 h-14 z-20 absolute top-28 left-1/2 transform -translate-x-1/2 rounded-full flex items-center justify-center transition-all duration-300 pulse-ring'></div> */}
                <p className={clsx(isMobile ? 'text-2xl' : 'text-4xl', '-mt-36', 'font-[poppins-bold] text-center leading-snug z-100 flex flex-col items-center')}><br />Blog Freely, Speak Boldly. <br /> <span className='flex gap-2 items-center justify-center'> Say It. AI’s <WandSparkles className={`${isMobile ? 'size-6' : 'size-8'} -mb-1`} /> Got You </span></p>
                <div className='flex flex-wrap gap-2 items-center justify-center z-100'>
                    {localStorage.getItem('authToken') ?
                        <div className='flex gap-2 items-center'>
                            <Button className='bg-gradient-to-r from-[#6c5ce7] to-[#958aec] px-8 py-5 z-100 flex items-center justify-center gap-1 text-white font-[poppins-medium]' onClick={() => navigate('/createpost')}>
                                <Plus className='size-4.5' />
                                Create Post</Button>
                            <Button className='bg-red-400 py-5 flex items-center justify-center gap-1 text-white font-[poppins-medium]' onClick={() => {
                                localStorage.removeItem('authToken')
                                localStorage.removeItem('userId')
                                localStorage.removeItem("aiUsesDate");
                                localStorage.removeItem("aiUsesLeft")
                                toast('Logging out...')
                                window.location.reload();
                            }}> Logout<LogOut className='size-4.5' /></Button>
                        </div>
                        : <Button className='bg-gradient-to-r from-[#6c5ce7] to-[#958aec] px-8 z-100' onClick={() => setAuthActive(true)}>Get Started</Button>}
                </div>

            </div>
            <Button
                className={`${onHero ? 'bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' : 'bg-[#272b34]'}
                     w-14 h-14 z-20 fixed bottom-8 right-4 rounded-full flex items-center justify-center transition-all duration-300 ${onHero ? 'pulse-ring' : ''
                    } `}
                onClick={onHero ? scrollToPosts : scrollToHero}
            >
                {onHero ? <ArrowDown className='size-6' /> : <ArrowUp className='size-6' />}
            </Button>


            <div className='flex justify-center'>
                <div ref={postRef} className='-mt-10'></div>
                <div className='flex flex-col p-2 gap-4 max-w-6xl'>
                    <div className={`flex items-center justify-center gap-2 mt-6 mb-2 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                        <div className='flex gap-2 items-center'>
                            <Button className='bg-gradient-to-r from-[#6c5ce7] to-[#958aec] font-[poppins-medium]'>All Posts</Button>
                            <InfoDisplay
                                info={FilterUI}
                                infoProps={{ setSelectedCategory, setSelectedTag, setFilterLoading, SelectedCategory, SelectedTag }}
                                trigger={<Button className='bg-[#1c1f26] font-[poppins-medium] w-24 flex gap-2 items-center justify-center' onClick={() => filter()}>Filter {filterLoading ? <Loader size={16} /> : <Filter size={16} />} </Button>}

                            /></div>

                        <div className={`flex gap-1 items-center overflow-scroll handleScroll ${isMobile ? 'border-0' : 'border-l-2'} border-[#272b34] pl-2`}>

                            {SelectedCategory && <span className='px-2 pl-3 py-2 bg-[#272b34] rounded-full text-[13px] cursor-pointer flex items-center gap-1'>{SelectedCategory} <X className=' size-5 text-red' onClick={() => {
                                setSelectedCategory(null)
                                setFilterLoading(true)
                                fetchPosts('', '', SelectedTag).then(() => setFilterLoading(false))
                            }} /></span>}
                            {SelectedTag && <span className='px-2 py-2 pl-3 bg-[#272b34] rounded-full text-[13px] cursor-pointer flex items-center gap-1'>#{SelectedTag} <X className=' size-5 text-red' onClick={() => {
                                setSelectedTag(null)
                                setFilterLoading(true)
                                fetchPosts('', SelectedCategory, '').then(() => setFilterLoading(false))
                            }
                            } /> </span>}
                        </div>
                    </div>
                    {searchVal && <p className="text-center font-[poppins-bold] text-lg">Search Result for "{searchVal}"</p>}
                    <div className={clsx('flex', 'flex-wrap', 'gap-6', 'justify-center', 'pb-18')}>
                        {!GeneralLoading && data ?
                            postsExists ? (
                                currentPosts.map((element, i) => (
                                    <Post
                                        key={i}
                                        username={element.users.username}
                                        profilepic={element?.users?.profile_image_url}
                                        readtime={element?.read_time}
                                        date={element.created_at.slice(0, 10)}
                                        title={element.title}
                                        tags={typeof element.tags === 'string' && element.tags.includes(',') ? element.tags.split(',') : element.tags}
                                        postImg={element.image_url}
                                        likes={element.like_count}
                                        comment={element.comment_count}
                                        review={false}
                                        id={element.id}
                                        content={element.content}
                                        category={element.category}
                                        allLikes={element.liked_user_ids}
                                    />
                                ))
                            ) : (
                                <div className='flex flex-col items-center justify-center gap-4 bg-[#272b34] p-6 rounded-lg w-[18rem]'>
                                    <SearchSlash className='size-8 text-[#6c5ce7]' />
                                    <h2 className='text-lg font-[poppins-medium] text-white'>No Posts Found</h2>
                                </div>
                            ) : (
                                Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={i} />)
                            )
                        }

                    </div>
                    <div className='flex justify-center -mt-8'>
                        <Pagination
                            count={Math.ceil((data && data.length) / postsPerPage)}
                            page={currentPage}
                            onChange={(e, value) => {
                                setCurrentPage(value)
                                scrollToPosts();
                            }}
                            variant="outlined"
                            shape="rounded"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: "#bbbbcc",
                                    borderColor: "#444857",
                                    backgroundColor: "#1e212a",
                                    margin: "0 2px",
                                    fontSize: "1rem",            // Bigger font
                                    padding: "16px 16px",        // Bigger padding
                                    minWidth: "40px",
                                    minHeight: "40px",         // Wider buttons
                                    fontFamily: "Poppins, sans-serif",

                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#6c5ce7 !important",
                                    color: "#fff !important",
                                    borderColor: "#6c5ce7",
                                },
                                "& .MuiPaginationItem-icon": {
                                    color: "#bbbbcc",
                                    fontSize: "1.2rem",
                                },
                            }}
                        />

                    </div>

                </div>

            </div>

            <footer className="bg-[#0e1116] text-[#717889] py-6 pb-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-white font-[poppins-bold] text-lg">Sayso</h2>
                            <p className="text-sm mt-2">Blog Freely, Speak Boldly. Say More With Sayso.</p>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition">Terms of Service</a>
                            <a href="#" className="hover:text-white transition">Contact Us</a>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-[#272b34] pt-4 text-center">
                        <p className="text-sm">&copy; {new Date().getFullYear()} Sayso. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <Drawer
                anchor={isMobile ? "bottom" : "right"}
                open={AuthActive && !currentUser}
                onClose={() => setAuthActive(false)}
                onOpen={() => setAuthActive(true)}
                transitionDuration={200}
                PaperProps={{
                    sx: {
                        backgroundColor: '#1a1b20',
                        borderTopLeftRadius: '1rem',
                        borderTopRightRadius: '1rem',
                    },
                }}
            >
                <div className="p-1.5 px-3 max-wd-lg text-white bg-[#1a1b20] flex flex-col gap-4 items-center">
                    <X className='absolute right-4 top-4 cursor-pointer' onClick={() => setAuthActive(false)} />
                    {/* <div className='w-full flex gap-2 items-center'> */}
                    <div className="py-2">
                        <AuthForm />
                    </div>
                </div>
            </Drawer>

            <Toaster position="top-center" closeButton />
        </div>
    );
};

export default Home;