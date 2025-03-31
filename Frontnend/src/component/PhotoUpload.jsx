import  { useState ,useRef } from "react";

const PhotoUpload = ({ImageRef}) => {
  const [photos, setPhotos] = useState([]);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  return (
    <div className="bg-white border border-black p-6 rounded-xl shadow-md mt-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
    Choose a profile picture!
  </h3>
  <input ref={ImageRef}
    type="file"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    accept="image/*"
    multiple
    onChange={handlePhotoChange}
  />
  {photos.length > 0 && (
    <ul className="mt-4 space-y-2 text-gray-700">
      {photos.map((photo, index) => (
        <li key={index} className="p-2 bg-gray-100 rounded-lg">
          {photo.name}
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default PhotoUpload;
