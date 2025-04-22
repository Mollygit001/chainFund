import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWallet } from '../context/WalletContext'
import ProjectCard from '../components/ui/ProjectCard'
import { mockFeaturedProjects } from '../utils/mockData'

function Home() {
  const { account, connectWallet, isConnecting } = useWallet()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white border-b-3 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Crowdfunding on the <span className="text-primary-500">Blockchain</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-neutral-700 mb-8"
              >
                Fund revolutionary ideas with transparency, security, and community ownership through decentralized technology.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/explore" className="btn-primary text-xl">
                  Explore Projects
                </Link>
                <Link to="/create" className="btn-outline text-xl">
                  Start a Project
                </Link>
              </motion.div>
            </div>
            <div className="flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-80 lg:h-96 bg-primary-100 border-3 border-black shadow-brutal-lg relative overflow-hidden"
              >
                <img 
                  src="https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg" 
                  alt="Blockchain Crowdfunding" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t-3 border-black">
                  <p className="font-bold">Innovation meets community funding</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 py-20 border-b-3 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our decentralized platform revolutionizes crowdfunding with blockchain technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="card p-8 text-center"
            >
              <div className="w-20 h-20 bg-primary-500 border-3 border-black mx-auto mb-6 flex items-center justify-center shadow-brutal-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Create Project</h3>
              <p className="text-neutral-600">
                Launch your idea with a detailed project page, funding goals, and milestone roadmap
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="card p-8 text-center"
            >
              <div className="w-20 h-20 bg-secondary-500 border-3 border-black mx-auto mb-6 flex items-center justify-center shadow-brutal-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Fund Projects</h3>
              <p className="text-neutral-600">
                Back projects with cryptocurrency and receive ownership tokens representing your stake
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="card p-8 text-center"
            >
              <div className="w-20 h-20 bg-accent-500 border-3 border-black mx-auto mb-6 flex items-center justify-center shadow-brutal-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Track Progress</h3>
              <p className="text-neutral-600">
                Vote on milestones and transparently track how funds are being used on the blockchain
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-white py-20 border-b-3 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Featured Projects</h2>
            <Link to="/explore" className="btn-secondary">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockFeaturedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card max-w-4xl mx-auto p-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Ready to Launch Your Project?</h2>
              <p className="text-xl text-neutral-600">
                Start raising funds and building your community today
              </p>
            </div>
            
            {account ? (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/create" className="btn-primary text-xl text-center">
                  Create a Project
                </Link>
                <Link to="/explore" className="btn-outline text-xl text-center">
                  Browse Projects
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="btn-primary text-xl"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet to Start'}
                </button>
                <Link to="/explore" className="btn-outline text-xl text-center">
                  Browse Projects
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home