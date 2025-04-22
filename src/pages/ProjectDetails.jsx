import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { mockProjects } from '../utils/mockData'
import { motion } from 'framer-motion'

function ProjectDetails() {
  const { id } = useParams()
  const { account, connectWallet, isConnecting } = useWallet()
  const [activeTab, setActiveTab] = useState('about')
  const [contribution, setContribution] = useState(0.1)
  
  // Find the project with the matching ID
  const project = mockProjects.find(p => p.id === id) || mockProjects[0]
  
  const { 
    title, 
    description, 
    imageUrl, 
    goal, 
    raised, 
    creator, 
    creatorAddress,
    category, 
    daysLeft, 
    backers,
    milestones,
    updates,
    team,
    fullDescription
  } = project
  
  // Calculate progress percentage
  const progress = (raised / goal) * 100
  
  const handleContribute = () => {
    if (!account) {
      connectWallet()
      return
    }
    
    alert(`Contributing ${contribution} ETH to project: ${title}`)
    // Here would go the actual blockchain transaction code
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Project Header */}
      <div className="mb-8">
        <Link to="/explore" className="text-primary-500 font-bold flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Explore
        </Link>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex flex-wrap items-center gap-4">
          <span className="badge-accent">{category}</span>
          <div className="text-neutral-600">
            <span className="font-bold">by </span>
            <span>{creator}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (2/3 width on large screens) */}
        <div className="lg:col-span-2">
          {/* Project Image */}
          <div className="card overflow-hidden mb-8">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-96 object-cover border-b-3 border-black"
            />
          </div>
          
          {/* Tabs Navigation */}
          <div className="border-b-3 border-black mb-8">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 px-6 font-bold text-lg border-r-3 border-black 
                  ${activeTab === 'about' ? 'bg-primary-500 text-white' : 'bg-white text-black hover:bg-neutral-100'}`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('milestones')}
                className={`py-4 px-6 font-bold text-lg border-r-3 border-black 
                  ${activeTab === 'milestones' ? 'bg-primary-500 text-white' : 'bg-white text-black hover:bg-neutral-100'}`}
              >
                Milestones
              </button>
              <button
                onClick={() => setActiveTab('updates')}
                className={`py-4 px-6 font-bold text-lg border-r-3 border-black 
                  ${activeTab === 'updates' ? 'bg-primary-500 text-white' : 'bg-white text-black hover:bg-neutral-100'}`}
              >
                Updates
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`py-4 px-6 font-bold text-lg 
                  ${activeTab === 'team' ? 'bg-primary-500 text-white' : 'bg-white text-black hover:bg-neutral-100'}`}
              >
                Team
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="card">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                <div className="prose max-w-none">
                  <p className="text-lg mb-4">{fullDescription}</p>
                  {/* Additional project details would go here */}
                </div>
              </div>
            )}
            
            {/* Milestones Tab */}
            {activeTab === 'milestones' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Project Milestones</h2>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="border-3 border-black p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{milestone.title}</h3>
                        <span className={`badge ${milestone.completed ? 'bg-success-500 text-white' : 'bg-neutral-200'}`}>
                          {milestone.completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-neutral-600 mb-2">{milestone.description}</p>
                      <div className="flex justify-between text-sm">
                        <span>Funds Required: {milestone.fundsRequired} ETH</span>
                        <span>Estimated Delivery: {milestone.estimatedDelivery}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Updates Tab */}
            {activeTab === 'updates' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Project Updates</h2>
                <div className="space-y-6">
                  {updates.map((update, index) => (
                    <div key={index} className="border-b-2 border-neutral-200 last:border-b-0 pb-6 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{update.title}</h3>
                        <span className="text-sm text-neutral-500">{update.date}</span>
                      </div>
                      <p className="text-neutral-600">{update.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Team Tab */}
            {activeTab === 'team' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {team.map((member, index) => (
                    <div key={index} className="border-3 border-black p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full border-3 border-black overflow-hidden">
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{member.name}</h3>
                          <p className="text-neutral-600">{member.role}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-neutral-600">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar (1/3 width on large screens) */}
        <div className="lg:col-span-1">
          {/* Funding Stats */}
          <div className="card mb-8">
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-2xl font-bold">{raised} ETH</span>
                <span>of {goal} ETH goal</span>
              </div>
              <div className="w-full h-8 bg-neutral-200 border-3 border-black">
                <div 
                  className="h-full bg-secondary-500" 
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-bold">{Math.round(progress)}% funded</span>
                <span>{backers} backers</span>
              </div>
            </div>
            
            <div className="border-t-2 border-neutral-200 pt-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-bold">{daysLeft}</span>
                <span>days left</span>
              </div>
            </div>
            
            {/* Contribution Form */}
            <div className="mb-4">
              <label htmlFor="contribution" className="block text-lg font-bold mb-2">
                Contribution Amount (ETH)
              </label>
              <input
                type="number"
                id="contribution"
                value={contribution}
                onChange={(e) => setContribution(Number(e.target.value))}
                min="0.01"
                step="0.01"
                className="input mb-4"
              />
              
              <button
                onClick={handleContribute}
                className="btn-primary w-full text-xl"
              >
                {account ? 'Back This Project' : 'Connect Wallet to Contribute'}
              </button>
            </div>
            
            <p className="text-sm text-neutral-500">
              By backing this project, you'll receive ownership tokens proportional to your contribution.
            </p>
          </div>
          
          {/* Creator Info */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">About the Creator</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-neutral-200 border-3 border-black">
                {/* Creator avatar would go here */}
              </div>
              <div>
                <p className="font-bold">{creator}</p>
                <p className="text-sm text-neutral-600 break-all">{creatorAddress}</p>
              </div>
            </div>
            <p className="mb-4">
              Creator of {mockProjects.filter(p => p.creator === creator).length} projects
            </p>
            <div className="flex justify-between">
              <button className="btn-outline py-2 px-4">
                View Profile
              </button>
              <button className="btn-secondary py-2 px-4">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails