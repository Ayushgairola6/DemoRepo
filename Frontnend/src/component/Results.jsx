import { UseStore } from '../store/store';
import { IoLocation } from 'react-icons/io5';
import { useEffect } from 'react';
import { FaHeart, FaDownload } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { motion } from 'framer-motion';
import Matched from './MatchComp'
import Confetti from 'react-confetti';

const SearchResults = () => {
  const { FilteredResults, setFetchState, HandleLike, setFilteredResults,matchFound } = UseStore();

  useEffect(() => {
    setFetchState("idle");
  }, []);

  const SendLikeData = (match) => {
    HandleLike(match.user_id);
    const updated = FilteredResults.filter((m) => match !== m);
    setFilteredResults(updated);
  };

  const Dislike = (match) => {
    const updated = FilteredResults.filter((m) => match !== m);
    setFilteredResults(updated);
  };

  const DownloadMedia = async (image) => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {FilteredResults && FilteredResults.length > 0 ? (
        <motion.div
          style={{ background: "linear-gradient(140deg, lightpink, lavender)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="profile-container relative min-h-screen p-4"
        >
          {matchFound==="Matched"?(<><Matched/>
            <Confetti  style={{ zIndex: 9999, position: "fixed", top: 0, left: 0 }} /></>):null}
          {FilteredResults.map((profile, index) => (
            <div
              style={{ background: "whitesmoke" }}
              className="relative p-2 border max-h-screen md:max-h-[35rem] overflow-auto w-full md:w-82 border-black rounded-xl hover:shadow-md hover:shadow-red-500 cursor-pointer"
              key={index}
            >
              {/* Profile Image */}
              {profile.images && profile.images[0] !== '{thereisnoimageforthisuser}' ? (
                <div className="relative">
                  {profile.images[0].split("?")[0].endsWith("mp4") || profile.images[0].split("?")[0].endsWith("webm") ? (
                    <video
                      className="h-90 w-full mt-4 object-cover rounded-md"
                      src={profile.images[0]}
                      autoPlay
                      loop
                      controls={false}
                    />
                  ) : (
                    <img
                      className="md:h-50 h-90 w-full mt-4 object-cover rounded-md relative"
                      src={profile.images[0]}
                      alt="Uploaded"
                    />
                  )}
                  <FaDownload
                    onClick={() => DownloadMedia(profile.images[0])}
                    size={25}
                    className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1"
                  />
                </div>
              ) : (
                <img
                  className="md:h-50 h-90 w-full mt-4 object-cover rounded-md relative"
                  src="https://sesupport.edumall.jp/hc/article_attachments/900009570963/noImage.jpg"
                  alt="No image"
                />
              )}

              {/* Profile Name */}
              <h2 className="profile-name font-bold mt-2 flex items-normal justify-normal gap-2">
                <IoLocation /> {profile.name} {profile.age}
              </h2>
  {/* Compatibility Score */}
  <div className="border border-gray-400 mt-2 p-3 rounded-xl">
                <label className="font-bold">Compatibility Score:</label>
                <p>{profile.matchScore}</p>
              </div>
              {/* Profile Location */}
              <div className="border border-gray-400 mt-2 p-3 rounded-xl">
                <label className="font-bold">Location:</label>
                <p className="profile-location">{profile.state} {profile.country}</p>
              </div>
             
              {/* Hobbies Section */}
              {profile.hobbies && profile.hobbies.length > 0 && (
                <div className="border border-gray-400 mt-2 p-3 rounded-xl">
                  <label className="font-bold">Hobbies:</label>
                  <div className="flex items-center justify-evenly flex-wrap gap-2">
                    {profile.hobbies.map((hobby, i) => (
                      <ul
                        style={{ color: "green", border: "1px solid dimgray", boxShadow: "2px 2px 2px lime" }}
                        className="py-1 px-3 rounded-xl"
                        key={i}
                      >
                        {hobby}
                      </ul>
                    ))}
                  </div>
                </div>
              )}
            
              {/* Relationship Goal as About Section */}
              {profile.relationship_goal && (
                <div className="profile-about border border-gray-400 mt-2 p-3 rounded-xl">
                  <strong>About:</strong>
                  <ul>{profile.relationship_goal}</ul>
                </div>
              )}

            

              {/* Buttons */}
              <div className="flex items-center justify-between px-10 mt-3">
                <div id="like" className="bg-black rounded-full p-2">
                  <FaHeart
                    onClick={() => SendLikeData(profile)}
                    size={32}
                    color="lime"
                  />
                </div>
                <div id="dislike" className="bg-black rounded-full p-2">
                  <MdCancel
                    onClick={() => Dislike(profile)}
                    size={32}
                    color="magenta"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="font-bold text-4xl h-screen flex items-center justify-center">
          <h1 className="bg-white p-6 rounded-xl shadow-sm shadow-black animate-pulse">
            No match found...
          </h1>
        </div>
      )}
    </>
  );
};

export default SearchResults;