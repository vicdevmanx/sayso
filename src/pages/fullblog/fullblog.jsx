import InfoDisplay from "../components/trigger";
import { User, MoreHorizontal, ThumbsUp, ThumbsDown, MessageCircleMore, Share, ArrowRight, Pencil, Trash, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { More } from "../home/home";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";

const Fullblog = ({ username, profilepic, readtime, date, title, tags = ['nice', 'good'], postImg, likes, comment }) => {
    const [liked, setLiked] = useState(false)
    const [dislike, setDisLiked] = useState(false)
    const isMobile = useMediaQuery('(max-width: 700px)');
    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState({})

    const fetchPost = async () => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch("https://sayso-seven.vercel.app/posts/id", requestOptions);
            const result = await response.json();
            console.log(result)
            setData(result)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPost()
    })

    return (
        <div className='bg-[#0e1116] font-[poppins] text-[#f5f5f5] w-full min-h-screen h-full relative'>
            <div className="min-h-screen flex flex-col m-auto p-2 py-4 w-full max-w-2xl gap-4">
                <div className='flex justify-between w-full items-center'>
                    <div className='flex gap-2 items-center'>
                        <ChevronLeft onClick={() => navigate(-1)} className='size-10 -ml-2 rounded-full transition p-2 hover:bg-[#272b34] active:bg-[#272b34]' /><div className='bg-[#272b34] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition hover:bg-[#1c1f26]'>{<img src={data?.users?.image_url} className='object-fit w-full h-auto' /> && <User size={18} />}</div>
                        <div className=" text-[#bbbbcc] font-[poppins-medium] flex flex-col -gap-1.5">
                            <p className="text-white text-[13px]">{data?.users.username || 'anonymous'}</p>
                            <p className='flex items-center gap-1.5 text-xs'>{date || 'today'}<span className='bg-[#bbbbcc] w-1 h-1 rounded-full'></span> {readtime || '20 min'} read </p>
                        </div>
                    </div>
                    <div className='flex cursor-pointer items-center gap-1 active:bg-[#272b34] hover:bg-[#272b34] p-2 rounded-xl'>
                        <InfoDisplay
                            info={More}
                            trigger={<MoreHorizontal size={18} className="text-[#bbbbcc] cursor-pointer transition" />}
                        />
                    </div>
                </div>
                <h1 className="text-2xl font-[poppins-bold] text-white mb-4">{data?.title}</h1>
                <div className='flex gap-2 flex-wrap items-center'>
                    {data?.tags && data?.tags.map((tag) => (
                        <p className='text-[10.5px] font-[poppins-medium] border-2 border-[#272b34] text-[#717889] px-1.5 py-1 rounded-lg cursor-pointer select-none cursor-pointer'>{tag}</p>
                    ))}
                </div>
                <p className='text-sm'>{data?.content} || test content</p>

                <div className="bg-[#1c1f26] shadow-lg rounded-lg w-full min-h-32 h-auto">
                    {/* <img
                        src={data.image_url}
                        alt="Blog Avatar"
                        className="w-full"
                    /> */}
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
                        <Share className='size-5 cursor-pointer stroke-[#bbbbcc]' />
                    </div>
                    <p className='bg-white rounded-lg p-1.5 py-1 absolute right-0 text-black text-[13px] items-center gap-1 font-[poppins-medium] readMore'> Read
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </p>
                </div>


                <div className='flex flex-col gap-2 '>
                    <p className='font-[poppins-bold] text-lg' style={{ textAlign: isMobile ? 'center' : 'left' }}>Comments</p>
                    {isMobile ?
                        <div className=' flex items-center gap-1'> <input
                            className='bg-[#272b34] rounded-xl w-full py-3 px-4 outline-0 transition text-sm '
                            placeholder='Comment'
                        /> <ArrowRight className='bg-[#272b34] p-3 rounded-xl size-11 w-14' /> </div>
                        : <></>
                    }
                    <div className={clsx('rounded-xl', isMobile ? 'w-full' : 'w-108', 'overflow-scroll', 'h-128', 'flex', 'flex-col', 'gap-2', 'handleScroll', 'pb-12')}>


                        <div className='flex flex-col gap-2 font-[poppins] text-[13px]'>
                            <div className='border-2 border-[#272b34] rounded-lg p-2 flex gap-2 items-start'>
                                <span className='w-8 h-8 min-w-8 rounded-full bg-[#272b34]'></span>
                                <p className='leading-snug'>
                                    <span className='font-[poppins-medium] w-full text-sm'>username</span><br />
                                    <span>Lorem ipsum dolor sit amet consectetur repellat autem!</span> <br />
                                    <span className='flex items-center text-[#ffffff90] gap-2 cursor-pointer'>
                                        <Pencil className='size-7 active:bg-[#272b34] hover:bg-[#272b34] p-1.5 rounded-full' />
                                        <Trash className='size-7 active:bg-[#272b34] hover:bg-[#272b34] p-1.5 rounded-full' /></span>
                                </p>

                            </div>
                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}

export default Fullblog;