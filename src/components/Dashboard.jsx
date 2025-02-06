import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    profilePic: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [posts, setPosts] = useState([]); 
  const [newPostImage, setNewPostImage] = useState(null); 
  const [newPostCaption, setNewPostCaption] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login'); 
    } else {
      setUser(currentUser);
      setFormData(currentUser);
      setPreviewImage(currentUser.profilePic || ''); 

      setPosts([
        { id: 1, image: 'https://wallpapercave.com/wp/wp8297470.jpg', caption: 'Deku' },
        { id: 2, image: 'https://wallpapercave.com/wp/wp11808747.jpg', caption: 'Taki' },
        { id: 3, image: 'https://i.pinimg.com/originals/49/6a/27/496a276be97f402d35ab30755607d1e6.jpg', caption: 'Tanziro' },
      ]);
    }
  }, [navigate]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(user);
    setPreviewImage(user.profilePic || ''); 
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); 
        setFormData({ ...formData, profilePic: reader.result }); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem('currentUser', JSON.stringify(formData)); 
    setUser(formData); 
    setIsEditing(false); 
  };

  const handlePostImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostCaptionChange = (e) => {
    setNewPostCaption(e.target.value); 
  };

  const handleUploadPost = () => {
    if (newPostImage && newPostCaption) {
      const newPost = {
        id: posts.length + 1, 
        image: newPostImage,
        caption: newPostCaption,
      };
      setPosts([newPost, ...posts]); 
      setNewPostImage(null); 
      setNewPostCaption(''); 
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          <div className="flex items-center mb-8">
            <img
              src="https://i.pinimg.com/originals/94/91/70/949170351e429028fb1c2c927e7b2286.jpg"
              alt="Profile"
              className="h-32 w-32 rounded-full border-2 border-gray-300"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">Hi there..!</p>
              
              <div className="flex space-x-6 mt-4 text-gray-600">
                <span>
                  <strong>Posts</strong>: {posts.length}
                </span>
                <span>
                  <strong>Followers</strong>: 300 
                </span>
                <span>
                  <strong>Following</strong>: 180 
                </span>
              </div>
            </div>
            
          </div>

        
          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="rounded-md mr-2 bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Edit Profile
            </button>

          ) : (
            <div className="mt-4">
              <div className="flex flex-col space-y-3">
                <label className="text-gray-700 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="rounded-md border p-2"
                />

                <label className="text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="rounded-md border p-2"
                />

                <label className="text-gray-700 font-semibold">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="rounded-md border p-2"
                />

                <label className="text-gray-700 font-semibold">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="rounded-md border p-2"
                />

                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="mt-2 h-24 w-24 rounded-full border-2 border-gray-300"
                  />
                )}
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={handleSaveProfile}
                  className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="rounded-md bg-gray-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="mt-6 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
          >
            Log out
          </button>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">Upload Post</h2>
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handlePostImageUpload}
                className="rounded-md border p-2"
              />
              <textarea
                placeholder="Write a caption..."
                value={newPostCaption}
                onChange={handlePostCaptionChange}
                className="mt-2 rounded-md border p-2 w-full"
              />
              <button
                onClick={handleUploadPost}
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Upload Post
              </button>
            </div>
          </div>

          

      
          <div className="mt-8 grid grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-200 p-2 rounded-md">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-48 object-cover rounded-md"
                />
                <p className="mt-2 text-sm text-gray-700">{post.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
