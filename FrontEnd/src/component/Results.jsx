import { UseStore } from '../store/store';
import profileImg from '../assets/profileImage.webp';
import { IoLocation } from 'react-icons/io5';

const SearchResults = () => {
  const { FilteredResults } = UseStore();
  return (
    <>
      {FilteredResults?(<div onClick={() => console.log(FilteredResults)} className="results">
              {FilteredResults.map((profile) => {
                return (
                  <div
                    key={profile.id} // Added a key prop for each profile
                    style={{
                      backgroundImage: `url(${!profile.images ? profileImg : profile.images[0]})`,
                    }}
                    className="profile"
                  >
                    <span id="nameAndImage">
                      {profile.username} {profile.age}
                    </span>
                    <span className="location">
                      <IoLocation /> {profile.country} {profile.city} {profile.state}
                    </span>
                    <span id="score">Compatibility score: {profile.matchScore}</span>
                    <div className="action">
                      <button>chat</button>
                      <button>Remove</button>
                    </div>
                  </div>
                );
              })}
            </div>):<div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><h1>No match found...</h1></div>}
    </>
  );
};

export default SearchResults;
