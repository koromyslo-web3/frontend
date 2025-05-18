import Vue from 'vue'

const state = Vue.observable({
  account: null,
  chainId: null,
  connected: false,
})

const setAccount = (address) => {
  state.account = address
  state.connected = !!address
}

const setChainId = (chainId) => {
  state.chainId = chainId
}

// Подключиться к MetaMask
const connect = async () => {
  if (!window.ethereum) throw new Error('MetaMask not found')

  const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
  const chainId = await window.ethereum.request({ method: 'eth_chainId' })

  setAccount(account)
  setChainId(chainId)

  // Подписки
  window.ethereum.on('accountsChanged', (accounts) => {
    setAccount(accounts[0] || null)
  })

  window.ethereum.on('chainChanged', (_chainId) => {
    setChainId(_chainId)
  })
}

// Сменить сеть программно
const switchChain = async (hexChainId) => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainId }],
    })
  } catch (error) {
    // Сеть не добавлена в MetaMask?
    if (error.code === 4902) {
      throw new Error('Network was not found in MetaMask')
    } else {
      throw error
    }
  }
}

export default {
  state,
  connect,
  switchChain,
}
