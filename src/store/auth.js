import Vue from 'vue'
import apiAuth from '@/api/auth'

const state = Vue.observable({
  account: null,
  chainId: null,
})

const setAccount = async (address) => {
  state.account = address
  state.connected = !!address

  if (state.connected) {
    await authenticate()
  } else {
    await logout()
  }
}

const logout = async () => {
  await apiAuth.logout()
}

const setChainId = (chainId) => {
  state.chainId = chainId
}

const connect = async () => {
  if (!window.ethereum) throw new Error('MetaMask not found')

  console.log(1)

  const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
  const chainId = await window.ethereum.request({ method: 'eth_chainId' })

  console.log(2)

  await setAccount(account)
  setChainId(chainId)

  window.ethereum.on('accountsChanged', async (accounts) => {
    await setAccount(accounts[0] || null)
  })

  window.ethereum.on('chainChanged', (_chainId) => {
    setChainId(_chainId)
  })
}

const authenticate = async () => {
  try {
    const access_token = await apiAuth.getAccessToken()
    apiAuth.setAccessToken(access_token)
  } catch (error) {
    if (!state.account) throw new Error('Unable to authenticate: wallet is not connected.')
    if (!window.ethereum) throw new Error('MetaMask not found')

    const data = await apiAuth.getNonce(state.account)
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [data.msg, data.address],
    })
    await apiAuth.verifySig(data.nonce, signature)
    const access_token = await apiAuth.getAccessToken()
    apiAuth.setAccessToken(access_token)
  }
}

const switchChain = async (hexChainId) => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainId }],
    })
  } catch (error) {
    if (error.code === 4902) {
      throw new Error('Network was not found in MetaMask')
    }
    throw error
  }
}

export default {
  state,
  connect,
  switchChain,
  authenticate
}
