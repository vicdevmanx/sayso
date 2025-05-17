

const Profile = () => {
    return (
        <div className="min-h-screen flex flex-col items-center py-10">
            <h1 className="text-4xl font-bold text-white mb-6">Profile Page</h1>
            <div className="bg-[#1c1f26] shadow-lg rounded-lg p-6 w-full max-w-4xl">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile Avatar"
                        className="w-32 h-32 rounded-full mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-white">John Doe</h2>
                    <p className="text-gray-600 text-center mt-2">
                        Lover of tech, coffee, and good vibes. 🌟
                    </p>
                </div>
                
                <div className="bg-[#272b34] p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Posts</h3>
                    <ul className="space-y-2">
                        <li className="text-gray-700">🌿 Exploring the beauty of nature</li>
                        <li className="text-gray-700">📚 Just finished a great book!</li>
                        <li className="text-gray-700">☕ Had an amazing coffee today</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;