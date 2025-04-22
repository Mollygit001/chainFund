import { useState } from 'react'
import ProjectCard from '../components/ui/ProjectCard'
import { mockProjects } from '../utils/mockData'

function Explore() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortOption, setSortOption] = useState('newest')
  
  const categories = ['All', 'Technology', 'Art', 'Games', 'Music', 'Film', 'Community']
  
  // Filter projects based on search term and category
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })
  
  // Sort projects based on selected option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'mostFunded':
        return b.raised - a.raised
      case 'endingSoon':
        return a.daysLeft - b.daysLeft
      case 'percentFunded':
        return (b.raised / b.goal) - (a.raised / a.goal)
      default:
        return 0
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Explore Projects</h1>
        <p className="text-xl text-neutral-600">
          Discover innovative projects seeking funding on the blockchain
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div className="col-span-1 md:col-span-3">
            <label htmlFor="search" className="block text-lg font-bold mb-2">
              Search Projects
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by project name or description"
              className="input"
            />
          </div>
          
          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-lg font-bold mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort Options */}
          <div>
            <label htmlFor="sort" className="block text-lg font-bold mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="input"
            >
              <option value="newest">Newest</option>
              <option value="mostFunded">Most Funded</option>
              <option value="endingSoon">Ending Soon</option>
              <option value="percentFunded">% Funded</option>
            </select>
          </div>
          
          {/* Results Count */}
          <div className="flex items-end">
            <p className="text-lg font-bold">
              {sortedProjects.length} {sortedProjects.length === 1 ? 'Project' : 'Projects'} Found
            </p>
          </div>
        </div>
      </div>
      
      {/* Project Grid */}
      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-16">
          <h3 className="text-2xl font-bold mb-2">No Projects Found</h3>
          <p className="text-neutral-600 mb-6">
            Try adjusting your search filters or browse all projects
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('All')
            }}
            className="btn-primary"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Explore