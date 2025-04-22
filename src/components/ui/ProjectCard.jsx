import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function ProjectCard({ project }) {
  const { id, title, description, imageUrl, goal, raised, creator, category, daysLeft } = project

  // Calculate progress percentage
  const progress = (raised / goal) * 100
  
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="card overflow-hidden"
    >
      <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden border-b-3 border-black">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className="badge-accent">{category}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2 line-clamp-1">{title}</h3>
      <p className="text-neutral-600 mb-4 line-clamp-2">{description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="font-bold">{raised} ETH raised</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-6 bg-neutral-200 border-2 border-black">
          <div 
            className="h-full bg-secondary-500" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span>Goal: {goal} ETH</span>
          <span>{daysLeft} days left</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="text-neutral-500">by </span>
          <span className="font-bold">{creator}</span>
        </div>
        <Link 
          to={`/projects/${id}`} 
          className="btn-primary py-2 px-4"
        >
          View Project
        </Link>
      </div>
    </motion.div>
  )
}

export default ProjectCard