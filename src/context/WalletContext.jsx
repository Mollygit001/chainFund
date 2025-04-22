import { createContext, useState, useEffect, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { ethers } from 'ethers'

const WalletContext = createContext()

export function useWallet() {
  return useContext(WalletContext)
}

export function WalletProvider({ children }) {
  const [account, setAccount] = useState('')
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [network, setNetwork] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)

  const disconnectWallet = () => {
    setAccount('')
    setProvider(null)
    setSigner(null)
    setNetwork(null)
  }

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true)
      setError(null)

      if (!window.ethereum) {
        setError("No wallet found. Please install MetaMask!")
        setIsConnecting(false)
        return
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

      const ethersProvider = new ethers.BrowserProvider(window.ethereum)
      const ethersSigner = await ethersProvider.getSigner()
      const network = await ethersProvider.getNetwork()

      setAccount(accounts[0])
      setProvider(ethersProvider)
      setSigner(ethersSigner)
      setNetwork(network)
      setIsConnecting(false)

      // Listeners
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          const newSigner = await ethersProvider.getSigner()
          const newNetwork = await ethersProvider.getNetwork()
          setAccount(accounts[0])
          setSigner(newSigner)
          setNetwork(newNetwork)
        }
      }

      const handleChainChanged = () => {
        window.location.reload()
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

    } catch (error) {
      console.error("Failed to connect wallet:", error)
      setError("Failed to connect wallet. Please try again.")
      setIsConnecting(false)
    }
  }, [])

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      if (!window.ethereum) {
        setError("No wallet found. Please install MetaMask!")
        return
      }

      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts.length > 0) {
        connectWallet()
      }
    } catch (error) {
      console.error("Failed to check wallet connection:", error)
      setError("Failed to connect wallet. Please try again.")
    }
  }, [connectWallet])

  useEffect(() => {
    checkIfWalletIsConnected()

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {})
        window.ethereum.removeListener('chainChanged', () => {})
      }
    }
  }, [checkIfWalletIsConnected])

  const value = {
    account,
    provider,
    signer,
    network,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

WalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
