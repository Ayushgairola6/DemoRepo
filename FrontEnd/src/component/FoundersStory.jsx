import React from 'react';
import './FoundersStory.css'; 

const FoundersStory = ({ title, description, imageSrc, quote }) => {
    return (
        <section className="founders-story" aria-labelledby="founders-story-title">
            {/* Title */}
            <h2 id="founders-story-title">{title}</h2>

            {/* Content Section */}
            <div className="values-container">
                {/* Description */}
                <p>{description}</p>

                {/* Optional Image */}
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt="Founders Inspiration"
                        className="value-box"
                    />
                )}
            </div>

            
            {quote && (
                <blockquote className="value-box">
                    “{quote}”
                </blockquote>
            )}
        </section>
    );
};

FoundersStory.defaultProps = {
    title: "Founders’ Story & Inspiration",
    description:
        "Inspired by personal journeys and the universal need for deeper connections, our founders created LoveLense to bridge gaps in all types of relationships, including those with unique challenges.",
    imageSrc: "",
    quote: "Every great journey begins with a single step, and LoveLense is ours.",
};

export default FoundersStory;
