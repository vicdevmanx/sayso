import React, { useState, useRef } from 'react';
import { Camera, Plus } from 'lucide-react';

const CreatePost = () => {
    const profileImgRef = useRef(null);
    const [profileImg, setProfileImg] = useState(null);

    const handleFileUpload = () => {
        profileImgRef.current?.click();
    };


    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setProfileImg(base64String);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className='flex items-center p-2 justify-center pb-18'>
            <div className='bg-[#1c1f26] border-[1.5px] border-[#272b34] flex flex-col rounded-xl gap-3 items-center w-full max-w-lg p-3 justify-center'>
                <h1 className='font-[poppins-bold] text-xl'>Create Post</h1>
                <input
                    type='text'
                    placeholder='Title'
                    className='p-3 rounded-md bg-[#272b34] text-white w-full outline-0 border-2 border-transparent focus:border-white transition text-sm'
                />

                <input
                    type="file"
                    ref={profileImgRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="w-full h-auto min-h-30 rounded-md bg-[#272b34] flex justify-center items-center overflow-hidden" onClick={handleFileUpload}>
                    {profileImg ? <img src={profileImg} /> : <div className='flex flex-col gap-1 items-center'><Camera className="size-10" /> <p>Add Image</p></div>}
                </div>
                <textarea
                    placeholder='Content'
                    className='p-3 rounded-md bg-[#272b34] text-white h-32 resize-none w-full outline-0 border-2 border-transparent focus:border-white transition text-sm'
                />
                <input
                    type='text'
                    placeholder='Tags (comma separated)'
                    className='p-3 rounded-md bg-[#272b34] text-white w-full outline-0 border-2 border-transparent focus:border-white transition text-sm'
                />
                <input
                    type='text'
                    placeholder='Keywords (comma separated)'
                    className='p-3 rounded-md bg-[#272b34] text-white w-full outline-0 border-2 border-transparent focus:border-white transition text-sm'
                />
                <button
                    type='submit'
                    className='p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full mt-2'
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CreatePost;