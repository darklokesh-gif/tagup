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

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
      setFormData(currentUser);
      setPreviewImage(currentUser.profilePic); // Set initial profile pic preview
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(user);
    setPreviewImage(user.profilePic); // Reset image preview
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload (File Selection)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Show preview
        setFormData({ ...formData, profilePic: reader.result }); // Store Base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem('currentUser', JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Welcome, {user.name}!
          </h1>

          {!isEditing ? (
            <div>
              <div className="flex items-center space-x-4">
                <img
                  src={previewImage || 'https://via.placeholder.com/100'}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border-2 border-gray-300"
                />
                <div>
                  <p className="text-lg text-gray-700"><strong>Email:</strong> {user.email}</p>
                  <p className="text-gray-600"><strong>Bio:</strong> {user.bio || 'No bio available'}</p>
                </div>
              </div>
              <button
                onClick={handleEditClick}
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div>
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
