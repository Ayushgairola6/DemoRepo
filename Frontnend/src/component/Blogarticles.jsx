
import React, { useState } from 'react';
import "./BlogPage.css";
import { motion, AnimatePresence } from 'framer-motion';

const BlogArticlesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedArticle, setExpandedArticle] = useState(null);

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'relationship', name: 'Relationship Advice' },
    { id: 'inmate', name: 'Inmate Connection' },
    { id: 'success', name: 'Success Stories' }
  ];

  const articles = {
    relationship: [
      {
        id: 1,
        title: "Building a Strong Emotional Connection",
        description: "Explore practical tips and techniques to deepen your bond and foster trust.",
        readTime: "5 min read",
        category: "relationship",
        content: "Building a strong emotional connection requires trust, communication, and understanding..."
      },
      {
        id: 2,
        title: "Long-Distance Relationship Tips",
        description: "Discover ways to keep the spark alive and stay emotionally connected despite the miles.",
        readTime: "7 min read",
        category: "relationship",
        content: "Maintaining a long-distance relationship can be challenging but rewarding..."
      },
      {
        id: 3,
        title: "Effective Communication in Relationships",
        description: "Learn how to navigate tough conversations and improve your communication skills.",
        readTime: "6 min read",
        category: "relationship",
        content: "Good communication is the foundation of any healthy relationship..."
      }
    ],
    inmate: [
      {
        id: 4,
        title: "Connecting with Inmates: A Guide",
        description: "Understand the unique challenges and considerations of building relationships with inmates.",
        readTime: "8 min read",
        category: "inmate",
        content: "Building a relationship with an inmate requires patience, understanding, and dedication..."
      },
      {
        id: 5,
        title: "Supporting Your Inmate Partner",
        description: "Find out how to provide emotional support and encouragement during incarceration.",
        readTime: "6 min read",
        category: "inmate",
        content: "Supporting an incarcerated partner involves emotional strength and resilience..."
      },
      {
        id: 6,
        title: "Writing Letters to Inmates",
        description: "Tips for crafting meaningful and uplifting letters to stay connected.",
        readTime: "4 min read",
        category: "inmate",
        content: "Letter writing is a powerful way to maintain connection and share experiences..."
      }
    ],
    success: [
      {
        id: 7,
        title: "Celebrating Our Matches",
        description: "Heartwarming stories from couples who found love through LoveLens.",
        readTime: "5 min read",
        category: "success",
        content: "Read inspiring stories of couples who found love against all odds..."
      },
      {
        id: 8,
        title: "Overcoming Obstacles Together",
        description: "Inspiring testimonials from partners who conquered challenges to build lasting relationships.",
        readTime: "7 min read",
        category: "success",
        content: "Every relationship faces challenges, but these couples proved love conquers all..."
      },
      {
        id: 9,
        title: "A Love That Defied the Odds",
        description: "Read about couples who proved that love knows no boundaries.",
        readTime: "6 min read",
        category: "success",
        content: "These incredible stories show that true love can overcome any obstacle..."
      }
    ]
  };

  // matching each article even for keywords or title
  const filteredArticles = Object.values(articles)
    .flat()
    .filter(article => 
      (selectedCategory === 'all' || article.category === selectedCategory) &&
      (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       article.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <motion.div 
      initial={{opacity:0}} 
      animate={{opacity:1,y:0}} 
      transition={{duration:0.5}} 
      className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.header 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog & Articles</h1>
          <p className="text-lg text-gray-600">Your go-to resource for relationship advice, inmate connection tips, and success stories.</p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
              />
              <span className="absolute right-4 top-3 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.header>

        {/* Articles Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode='sync'>
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300
                  ${expandedArticle === article.id ? 'md:col-span-2 lg:col-span-3' : ''}`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  
                  <AnimatePresence mode='sync'>
                    {expandedArticle === article.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <p className="text-gray-700">{article.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white rounded-full font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-200"
                  >
                    {expandedArticle === article.id ? 'Read Less' : 'Read More'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-600">No articles found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-pink-500 hover:text-pink-600"
            >
              Clear filters
            </button>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};
 


export default BlogArticlesPage; 