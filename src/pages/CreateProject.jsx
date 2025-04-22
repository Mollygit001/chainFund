import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { motion } from 'framer-motion'

function CreateProject() {
  const { account, connectWallet, isConnecting } = useWallet()
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    goal: '',
    duration: 30,
    tagline: '',
    description: '',
    imageUrl: '',
    milestones: [
      { title: '', description: '', fundsRequired: '', estimatedDelivery: '' }
    ],
    team: [
      { name: '', role: '', bio: '' }
    ]
  })
  
  const categories = ['Technology', 'Art', 'Games', 'Music', 'Film', 'Community']
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  
  const handleMilestoneChange = (index, e) => {
    const { name, value } = e.target
    const updatedMilestones = [...formData.milestones]
    updatedMilestones[index] = { ...updatedMilestones[index], [name]: value }
    setFormData({ ...formData, milestones: updatedMilestones })
  }
  
  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [
        ...formData.milestones,
        { title: '', description: '', fundsRequired: '', estimatedDelivery: '' }
      ]
    })
  }
  
  const removeMilestone = (index) => {
    const updatedMilestones = [...formData.milestones]
    updatedMilestones.splice(index, 1)
    setFormData({ ...formData, milestones: updatedMilestones })
  }
  
  const handleTeamChange = (index, e) => {
    const { name, value } = e.target
    const updatedTeam = [...formData.team]
    updatedTeam[index] = { ...updatedTeam[index], [name]: value }
    setFormData({ ...formData, team: updatedTeam })
  }
  
  const addTeamMember = () => {
    setFormData({
      ...formData,
      team: [
        ...formData.team,
        { name: '', role: '', bio: '' }
      ]
    })
  }
  
  const removeTeamMember = (index) => {
    const updatedTeam = [...formData.team]
    updatedTeam.splice(index, 1)
    setFormData({ ...formData, team: updatedTeam })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!account) {
      connectWallet()
      return
    }
    
    // In a real app, this would submit the project to the blockchain
    alert('Project created successfully! In a real implementation, this would be submitted to the blockchain.')
    navigate('/explore')
  }
  
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full border-3 border-black flex items-center justify-center font-bold
            ${step >= 1 ? 'bg-primary-500 text-white' : 'bg-white text-black'}`}>
            1
          </div>
          <div className={`w-16 h-3 ${step >= 2 ? 'bg-primary-500' : 'bg-neutral-200'} border-y-3 border-black`}></div>
          <div className={`w-10 h-10 rounded-full border-3 border-black flex items-center justify-center font-bold
            ${step >= 2 ? 'bg-primary-500 text-white' : 'bg-white text-black'}`}>
            2
          </div>
          <div className={`w-16 h-3 ${step >= 3 ? 'bg-primary-500' : 'bg-neutral-200'} border-y-3 border-black`}></div>
          <div className={`w-10 h-10 rounded-full border-3 border-black flex items-center justify-center font-bold
            ${step >= 3 ? 'bg-primary-500 text-white' : 'bg-white text-black'}`}>
            3
          </div>
        </div>
      </div>
    )
  }

  // Form step 1: Basic Project Info
  const renderStep1 = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Basic Project Information</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-bold mb-2">
              Project Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input"
              placeholder="Enter your project title"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-lg font-bold mb-2">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="tagline" className="block text-lg font-bold mb-2">
              Project Tagline*
            </label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              required
              className="input"
              placeholder="A short description of your project (max 100 characters)"
              maxLength={100}
            />
          </div>
          
          <div>
            <label htmlFor="imageUrl" className="block text-lg font-bold mb-2">
              Project Image URL*
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="input"
              placeholder="Enter an image URL for your project"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="goal" className="block text-lg font-bold mb-2">
                Funding Goal (ETH)*
              </label>
              <input
                type="number"
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                required
                min="0.1"
                step="0.1"
                className="input"
                placeholder="Enter your funding goal in ETH"
              />
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-lg font-bold mb-2">
                Duration (Days)*
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
                max="90"
                className="input"
                placeholder="Enter campaign duration in days"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setStep(2)}
            className="btn-primary"
            disabled={!formData.title || !formData.category || !formData.tagline || !formData.goal || !formData.duration}
          >
            Next Step
          </button>
        </div>
      </div>
    )
  }
  
  // Form step 2: Project Details and Milestones
  const renderStep2 = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Project Details & Milestones</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-lg font-bold mb-2">
              Full Project Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="input min-h-32"
              placeholder="Provide a detailed description of your project"
            ></textarea>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Project Milestones*</h3>
              <button
                type="button"
                onClick={addMilestone}
                className="btn-secondary py-1 px-3"
              >
                Add Milestone
              </button>
            </div>
            
            <div className="space-y-6">
              {formData.milestones.map((milestone, index) => (
                <div key={index} className="border-3 border-black p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold">Milestone {index + 1}</h4>
                    {formData.milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="text-error-500 font-bold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor={`milestone-title-${index}`} className="block font-bold mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        id={`milestone-title-${index}`}
                        name="title"
                        value={milestone.title}
                        onChange={(e) => handleMilestoneChange(index, e)}
                        required
                        className="input"
                        placeholder="Milestone title"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`milestone-description-${index}`} className="block font-bold mb-1">
                        Description
                      </label>
                      <textarea
                        id={`milestone-description-${index}`}
                        name="description"
                        value={milestone.description}
                        onChange={(e) => handleMilestoneChange(index, e)}
                        required
                        className="input"
                        placeholder="Describe this milestone"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`milestone-funds-${index}`} className="block font-bold mb-1">
                          Funds Required (ETH)
                        </label>
                        <input
                          type="number"
                          id={`milestone-funds-${index}`}
                          name="fundsRequired"
                          value={milestone.fundsRequired}
                          onChange={(e) => handleMilestoneChange(index, e)}
                          required
                          min="0.01"
                          step="0.01"
                          className="input"
                          placeholder="Funds needed"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`milestone-delivery-${index}`} className="block font-bold mb-1">
                          Estimated Delivery
                        </label>
                        <input
                          type="text"
                          id={`milestone-delivery-${index}`}
                          name="estimatedDelivery"
                          value={milestone.estimatedDelivery}
                          onChange={(e) => handleMilestoneChange(index, e)}
                          required
                          className="input"
                          placeholder="e.g., Q2 2023"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep(1)}
            className="btn-outline"
          >
            Previous Step
          </button>
          <button
            onClick={() => setStep(3)}
            className="btn-primary"
            disabled={!formData.description || formData.milestones.some(m => !m.title || !m.description || !m.fundsRequired || !m.estimatedDelivery)}
          >
            Next Step
          </button>
        </div>
      </div>
    )
  }
  
  // Form step 3: Team and Review
  const renderStep3 = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Team & Final Review</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Project Team</h3>
              <button
                type="button"
                onClick={addTeamMember}
                className="btn-secondary py-1 px-3"
              >
                Add Team Member
              </button>
            </div>
            
            <div className="space-y-6">
              {formData.team.map((member, index) => (
                <div key={index} className="border-3 border-black p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold">Team Member {index + 1}</h4>
                    {formData.team.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="text-error-500 font-bold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor={`team-name-${index}`} className="block font-bold mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id={`team-name-${index}`}
                        name="name"
                        value={member.name}
                        onChange={(e) => handleTeamChange(index, e)}
                        required
                        className="input"
                        placeholder="Team member name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`team-role-${index}`} className="block font-bold mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        id={`team-role-${index}`}
                        name="role"
                        value={member.role}
                        onChange={(e) => handleTeamChange(index, e)}
                        required
                        className="input"
                        placeholder="e.g., Lead Developer"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`team-bio-${index}`} className="block font-bold mb-1">
                        Bio
                      </label>
                      <textarea
                        id={`team-bio-${index}`}
                        name="bio"
                        value={member.bio}
                        onChange={(e) => handleTeamChange(index, e)}
                        required
                        className="input"
                        placeholder="Short bio for this team member"
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card bg-neutral-50">
            <h3 className="text-xl font-bold mb-4">Project Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-bold">Project Title:</span>
                <span>{formData.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Category:</span>
                <span>{formData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Funding Goal:</span>
                <span>{formData.goal} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Duration:</span>
                <span>{formData.duration} days</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Number of Milestones:</span>
                <span>{formData.milestones.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Team Size:</span>
                <span>{formData.team.length} members</span>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-100 border-3 border-black p-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="w-5 h-5 border-3 border-black" />
              <label htmlFor="terms">
                I confirm that all information provided is accurate and I agree to the platform's terms and conditions
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep(2)}
            className="btn-outline"
          >
            Previous Step
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary"
            disabled={!account}
          >
            {account ? 'Launch Project' : 'Connect Wallet to Launch'}
          </button>
        </div>
      </div>
    )
  }
  
  // Wallet connection prompt if not connected
  const renderWalletPrompt = () => {
    return (
      <div className="card text-center py-16">
        <h2 className="text-3xl font-bold mb-6">Connect Your Wallet</h2>
        <p className="text-xl text-neutral-600 mb-8 max-w-lg mx-auto">
          You need to connect your wallet to create a new project on the blockchain
        </p>
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="btn-primary text-xl"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Create a New Project</h1>
      
      {!account ? (
        renderWalletPrompt()
      ) : (
        <div className="card">
          {renderStepIndicator()}
          
          <form>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </form>
        </div>
      )}
    </div>
  )
}

export default CreateProject