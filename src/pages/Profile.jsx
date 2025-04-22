import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { mockProjects } from '../utils/mockData'
import ProjectCard from '../components/ui/ProjectCard'

function Profile() {
  const { account, disconnectWallet } = useWallet()
  const [activeTab, setActiveTab] = useState('created')
  
  // Filter projects based on active tab
  const filterProjects = () => {
    if (activeTab === 'created') {
      // In a real app, this would filter projects created by the connected account
      return mockProjects.slice(0, 2)
    } else if (activeTab === 'backed') {
      // In a real app, this would filter projects backed by the connected account
      return mockProjects.slice(2, 5)
    } else if (activeTab === 'tokens') {
      // In a real app, this would show ownership tokens for the connected account
      return mockProjects.slice(0, 4)
    }
    return []
  }
  
  const projects = filterProjects()
  
  // Mock token data
  const tokens = [
    { projectId: '1', projectName: 'Virtual Reality Game', tokenCount: 25, tokenPercentage: 2.5 },
    { projectId: '3', projectName: 'Sustainable Fashion Line', tokenCount: 10, tokenPercentage: 1.0 },
    { projectId: '5', projectName: 'Smart Home Ecosystem', tokenCount: 50, tokenPercentage: 5.0 },
  ]
  
  // Format account address
  const formatAccount = (account) => {
    if (!account) return ''
    return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-neutral-200 border-3 border-black flex items-center justify-center">
              <span className="text-3xl font-bold">👤</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">Your Profile</h1>
              <p className="text-neutral-600 break-all">{account}</p>
            </div>
          </div>
          
          <button
            onClick={disconnectWallet}
            className="btn-outline py-2 px-4"
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
      
      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Projects Created</h3>
            <span className="text-3xl font-bold">2</span>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Projects Backed</h3>
            <span className="text-3xl font-bold">3</span>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Tokens Owned</h3>
            <span className="text-3xl font-bold">85</span>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="border-b-3 border-black mb-8">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('created')}
            className={`py-4 px-6 font-bold text-lg border-r-3 border-black 
              ${activeTab === 'created' ? 'bg-primary-500 text-white' : 'bg-white text-black hover:bg-neutral-100'}`}
          >
            Projects Created
          </button>
          <button
            onClick={() => setActiveTab('backed')}
            className={`py-4 px-6 font-bold text-lg border-r-3 border-black 
              ${activeTab === 'backed' ? 'bg-primary-500 text-white' : 'bg-white text-black hover:bg-neutral-100'}`}
          >
            Projects Backed
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`py-4 px-6 font-bold text-lg 
              ${activeTab === 'tokens' ? 'bg-primary-500 text-white' : 'bg-white text-black hover:bg-neutral-100'}`}
          >
            Ownership Tokens
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'tokens' ? (
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Your Ownership Tokens</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-3 border-black">
              <thead>
                <tr className="bg-neutral-100 border-b-3 border-black">
                  <th className="py-3 px-4 text-left">Project</th>
                  <th className="py-3 px-4 text-left">Token Count</th>
                  <th className="py-3 px-4 text-left">Ownership %</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => (
                  <tr key={index} className="border-b-2 border-neutral-200 last:border-b-0">
                    <td className="py-4 px-4 font-bold">{token.projectName}</td>
                    <td className="py-4 px-4">{token.tokenCount}</td>
                    <td className="py-4 px-4">{token.tokenPercentage}%</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Link to={`/projects/${token.projectId}`} className="btn-secondary py-1 px-3 text-sm">
                          View Project
                        </Link>
                        <button className="btn-outline py-1 px-3 text-sm">
                          Transfer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <h3 className="text-2xl font-bold mb-2">No Projects Found</h3>
              <p className="text-neutral-600 mb-6">
                {activeTab === 'created' 
                  ? "You haven't created any projects yet." 
                  : "You haven't backed any projects yet."}
              </p>
              <Link
                to={activeTab === 'created' ? '/create' : '/explore'}
                className="btn-primary"
              >
                {activeTab === 'created' ? 'Create a Project' : 'Explore Projects'}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Profile