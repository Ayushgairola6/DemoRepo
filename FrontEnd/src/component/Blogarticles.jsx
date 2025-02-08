import React from 'react';
import "./BlogPage.css";
const BlogArticlesPage = () => {
  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog & Articles</h1>
          <p className="text-lg text-gray-600">Your go-to resource for relationship advice, inmate connection tips, and success stories.</p>
        </header>

        {/* Articles Sections */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Relationship Advice Articles</h2>
          <div className="space-y-4">
            <ArticleCard
              title="Building a Strong Emotional Connection"
              description="Explore practical tips and techniques to deepen your bond and foster trust."
            />
            <ArticleCard
              title="Long-Distance Relationship Tips"
              description="Discover ways to keep the spark alive and stay emotionally connected despite the miles."
            />
            <ArticleCard
              title="Effective Communication in Relationships"
              description="Learn how to navigate tough conversations and improve your communication skills."
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Inmate-Specific Articles</h2>
          <div className="space-y-4">
            <ArticleCard
              title="Connecting with Inmates: A Guide"
              description="Understand the unique challenges and considerations of building relationships with inmates."
            />
            <ArticleCard
              title="Supporting Your Inmate Partner"
              description="Find out how to provide emotional support and encouragement during incarceration."
            />
            <ArticleCard
              title="Writing Letters to Inmates"
              description="Tips for crafting meaningful and uplifting letters to stay connected."
            />
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">User Success Stories</h2>
          <div className="space-y-4">
            <ArticleCard
              title="Celebrating Our Matches"
              description="Heartwarming stories from couples who found love through LoveLens."
            />
            <ArticleCard
              title="Overcoming Obstacles Together"
              description="Inspiring testimonials from partners who conquered challenges to build lasting relationships."
            />
            <ArticleCard
              title="A Love That Defied the Odds"
              description="Read about couples who proved that love knows no boundaries."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const ArticleCard = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default BlogArticlesPage;