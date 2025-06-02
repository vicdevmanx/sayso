import InfoDisplay from "../components/trigger";
import { User, MoreHorizontal, ThumbsUp, ThumbsDown, MessageCircleMore, Share, ArrowRight, Pencil, Trash, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { More } from "../home/home";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import Loader from "@/assets/loader/loader";
import { toast, Toaster } from "sonner";
import BlogSkeleton from "../components/blogskeleton";
import defaultProfile from '@/assets/default.webp'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

const Fullblog = ({ readtime, date, title, tags = ['nice', 'good'], postImg, likes, comment }) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // remove 'behavior' for instant scroll
        });
    }, []);
    const [liked, setLiked] = useState(false)
    const [dislike, setDisLiked] = useState(false)
    const isMobile = useMediaQuery('(max-width: 700px)');
    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState(null)

    const fetchPost = async () => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch(`https://sayso-seven.vercel.app/posts/${id}`, requestOptions);
            const result = await response.json();
            setData({ ...result, tags: typeof result.tags === 'string' ? result.tags.split(',') : result.tags })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])

    const [allComments, setAllComments] = useState([])
    const fetchComments = async () => {


        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const response = await fetch(`https://sayso-seven.vercel.app/posts/${id}/comments`, requestOptions)
            const result = await response.json()
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


    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            toast.success('Link Copied to clipboard!')
        } catch (err) {
            toast.error('Failed to copy')
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <>{data ?
            <div className='bg-[#0e1116] font-[poppins] text-[#f5f5f5] w-full min-h-screen h-full relative'>
                <Toaster position="top-center" />
                <div className="min-h-screen flex flex-col m-auto p-2 py-4 w-full max-w-4xl gap-4">
                    <div className='flex justify-between w-full items-center'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-2'>
                                <ChevronLeft onClick={() => navigate(-1)} className='size-10 -ml-2 rounded-full transition p-2 hover:bg-[#272b34] active:bg-[#272b34]' />
                                <p className='text-white text-xl font-[poppins-bold]'>Post</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <div className='bg-[#272b34] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition hover:bg-[#1c1f26] overflow-hidden'>{<img src={data?.users?.profile_image_url || defaultProfile} className='object-cover h-full' /> || <User size={18} />}</div>
                                <div className=" text-[#bbbbcc] font-[poppins-medium] flex flex-col -gap-1.5">
                                    <p className="text-white text-[13px]">{data?.users?.username || 'Loading...'}</p>
                                    <p className='flex items-center gap-1.5 text-xs'>{data?.created_at?.slice(0, 10) || 'Loading'}<span className='bg-[#bbbbcc] w-1 h-1 rounded-full'></span> {data?.read_time || 'loading...'} read </p>
                                </div>
                            </div>
                        </div>
                        {localStorage.getItem('userId') && localStorage.getItem('userId') == data?.users?.id && <div className='flex cursor-pointer items-center gap-1 active:bg-[#272b34] hover:bg-[#272b34] p-2 rounded-xl'>
                            <InfoDisplay
                                info={More}
                                infoProps={{ id }}
                                trigger={<MoreHorizontal size={18} className="text-[#bbbbcc] cursor-pointer transition" />}
                            />
                        </div>}

                    </div>
                    <h1 className="text-2xl font-[poppins-bold] text-white mb-4">{data?.title || 'loading...'}</h1>
                    <div className='flex gap-2 flex-wrap items-center'>
                        {tags ? typeof tags !== 'string' ? tags?.map(tag =>
                            <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer'>#{tag}</p>
                        ) : <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer'>#{tags}</p>
                            : <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer'>notag</p>}
                    </div>
                    <div><ReactMarkdown
                        children={String(data?.content)}
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]} /></div>

                    <div className="bg-[#1c1f26] shadow-lg rounded-lg w-full min-h-32 h-auto">
                        <img
                            src={data?.image_url}
                            alt="Blog Avatar"
                            className="w-full"
                        />
                    </div>

                    <div className='w-full b-0 h-full flex relative items-center gap-4 bg-[#1c1f26] p-2 rounded-lg'>
                        <div className='bg-[#272b34] rounded-xl flex gap-1 items-center cursor-pointer'>

                            <span className='flex gap-2 p-2 py-1.5 items-start rounded-xl hover:bg-[#3B82F650] active:bg-[#3B82F650] transition' onClick={() => { setDisLiked(false); setLiked(!liked); }}>
                                {liked && !dislike ? <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='size-5 cursor-pointer fill-blue-500 stroke-[#3B82F6]' onClick={() => setLiked(false)}><path d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"></path></svg>
                                    : <ThumbsUp onClick={() => {
                                        setDisLiked(false)
                                        setLiked(true)
                                    }} className='size-5 cursor-pointer stroke-[#bbbbcc] stroke-2 fill-transparent ' />

                                }<p className='text-[#bbbbcc] font-[poppins-medium] text-[15px]' style={{ color: liked && !dislike ? '#3B82F6' : '#bbbbcc' }}>{data.like_count || 0}</p>
                            </span>
                            <span className='p-2 py-1.5 rounded-xl hover:bg-[#EF444450] active:bg-[#EF444450] transition'>
                                {!dislike ? <ThumbsDown onClick={() => setDisLiked(true)} className='size-5 cursor-pointer stroke-[#bbbbcc] stroke-2 fill-transparent' />
                                    : <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='size-5 cursor-pointer fill-red-500 stroke-[#EF4444]' onClick={() => setDisLiked(false)}><path d="M19 15h4V3h-4m-4 0H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2a2 2 0 0 0 2 2h6.31l-.95 4.57c-.02.1-.03.2-.03.31c0 .42.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5a2 2 0 0 0-2-2"></path></svg>
                                }
                            </span>
                        </div>
                        <div className='flex items-center gap-1 cursor-pointer active:bg-[#272b34] hover:bg-[#272b34] p-2 py-1.5 rounded-xl' onClick={() => setMsgOpen(!msgOpen)}>
                            <MessageCircleMore className='size-5 cursor-pointer stroke-[#bbbbcc]' />
                            <p className='text-[#bbbbcc] font-[poppins-medium] text-[15px]'>{data.comment_count || 0}</p>
                        </div>

                        <div className='flex cursor-pointer items-center gap-1 active:bg-[#272b34] hover:bg-[#272b34] p-2 py-1.5 rounded-xl'>
                            <Share className='size-5 cursor-pointer stroke-[#bbbbcc]' onClick={() => copyToClipboard(`https://sayso-gules.vercel.app/post/${id}`)} />
                        </div>
                        <p className='bg-white rounded-lg p-1.5 py-1 absolute right-0 text-black text-[13px] items-center gap-1 font-[poppins-medium] readMore'> Read
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </p>
                    </div>


                    <div className='flex flex-col gap-2 '>
                        <p className='font-[poppins-bold] text-lg' style={{ textAlign: isMobile ? 'center' : 'left' }}>Comments</p>

                        <div className={clsx(' flex gap-1 w-full flex-col items-end relative', isMobile ? 'max-w-120' : 'w-full')}> <textarea
                            className='bg-[#1c1f26] rounded-xl w-full py-3 px-4 outline-0 transition text-sm pr-28 handleScroll'
                            placeholder='Say something...'
                            name="commentInput"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                        /><div className="absolute bottom-2 right-2"> {commentLoad ? <Button className={'bg-gradient-to-r from-[#6c5ce7] to-[#958aec] px-2 py-1 rounded-xl flex items-center justify-center gap-1.5 text-sm'}><Loader size={12}/> Sending...</Button> : <Button className={commentInput ? 'bg-gradient-to-r from-[#6c5ce7] to-[#958aec] px-4 py-1 text-sm rounded-xl text-xs' : 'bg-[#272b34] px-4 py-1 rounded-xl text-sm'} onClick={addComments} >Comment</Button>}</div> </div>




                        <div className={clsx('rounded-xl', isMobile ? 'w-full' : 'w-full', 'overflow-scroll', 'h-128', 'flex', 'flex-col', 'gap-2', 'handleScroll', 'pb-12')}>


                            {allComments.length > 0 ? allComments.map(comment =>
                                <div className='flex flex-col gap-2 font-[poppins] text-[13px] w-full'>
                                    <div className='border-2 border-[#272b34] rounded-lg p-2 flex gap-2 w-full'>
                                        {!comment.info && <span className='w-8 h-8 min-w-8 rounded-full bg-[#272b34] overflow-hidden flex items-center'>
                                            <img src={comment?.users?.profile_image_url || defaultProfile} className='object-cover h-full' loading="lazy" />
                                        </span>}
                                        <p className='leading-snug'>
                                            {!comment.info && <><span className='font-[poppins-medium] w-full text-sm'>{comment?.users?.username}</span><br /></>}
                                            <span className="w-full">{comment?.content}</span> <br />
                                            {comment.user_id == localStorage.getItem('userId') ?
                                                // <span className='flex items-center text-[#ffffff90] gap-2 cursor-pointer'>
                                                //     <Pencil className='size-7 active:bg-[#272b34] hover:bg-[#272b34] p-1.5 rounded-full' />
                                                //     <Trash className='size-7 active:bg-[#272b34] hover:bg-[#272b34] p-1.5 rounded-full' onClick={async () => {
                                                //         try {
                                                //             var myHeaders = new Headers();
                                                //             myHeaders.append("Authorization", `Bearer ${localStorage.getItem('authToken')}`);


                                                //             var raw = "null";

                                                //             var requestOptions = {
                                                //                 method: 'DELETE',
                                                //                 headers: myHeaders,
                                                //                 body: raw,
                                                //                 redirect: 'follow'
                                                //             }
                                                //             const response = await fetch(`https://sayso-seven.vercel.app/posts/comments/${comment.id}`, requestOptions);
                                                //             const result = await response.json();
                                                //             console.log(result);
                                                //             toast('Comment deleted successfully');
                                                //             await fetchComments();

                                                //         } catch (err) {
                                                //             console.log(err)
                                                //         }
                                                //     }} />
                                                // </span>
                                                <span className='text-[#ffffff90] text-xs'>{comment?.info || new Date(comment.created_at).toLocaleDateString()}</span>
                                                : <span className='text-[#ffffff90] text-xs'>{comment?.info || new Date(comment.created_at).toLocaleDateString()}</span>
                                            }
                                        </p>

                                    </div>
                                </div>
                            ) : <p className='text-[#bbbbcc] text-sm font-[poppins-medium] flex w-full justify-center'><Loader size={24} /></p>}


                        </div>

                    </div>

                </div>
            </div> :
            <BlogSkeleton />}</>
    )
}

export default Fullblog;