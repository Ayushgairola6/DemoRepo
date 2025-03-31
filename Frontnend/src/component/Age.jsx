import { FaPerson } from 'react-icons/fa6';
import { TbCirclesRelation } from 'react-icons/tb';
import { UseStore } from '../store/store';

const Age = () => {
  const { age, relationGoal, gender } = UseStore();

  return (
    <>
      {/* this outer div contains all the inputs */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: "1rem",
          marginTop: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid",
          borderRadius: "0.5rem",
          width: "100%",
          marginInline: "auto",
          // backgroundColor: "#e5e7eb",
        }}
      >
        {/* Age Selection */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "14rem" }}>
          <label
            style={{
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#4b5563",
            }}
          >
            Age <FaPerson style={{ color: "#3b82f6" }} />
          </label>
          <select
            ref={age}
            name="age"
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.4)",
            }}
          >
            {[...Array(50)].map((_, i) => (
              <option key={i} value={i + 18}>
                {i + 18}
              </option>
            ))}
          </select>
        </div>

        {/* Relationship Goals Selection */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "14rem" }}>
          <label
            style={{
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#4b5563",
            }}
          >
            Relationship Goals <TbCirclesRelation style={{ color: "#10b981" }} />
          </label>
          <select
            ref={relationGoal}
            name="relationGoal"
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.4)",
            }}
          >
            <option value="Casual">Casual</option>
            <option value="Short-term">Short-term</option>
            <option value="Long-term-open-to-short">Long-term-open-to-short</option>
            <option value="Marriage">Marriage</option>
            <option value="We'll figure it out">We'll figure it out</option>
            <option value="Looking for friends">Looking for friends</option>
          </select>
        </div>

        {/* Gender Selection */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "14rem" }}>
          <label
            style={{
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#4b5563",
            }}
          >
            Gender <TbCirclesRelation style={{ color: "#8b5cf6" }} />
          </label>
          <select
            ref={gender}
            name="gender"
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.4)",
            }}
          >
            <option value="Straight">Straight</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Transgender">Transgender</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Age;
