// Web3AuthContext.js

// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';

const Web3AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const Web3AuthProvider = ({ children }) => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    //const [trigger, setTrigger] = useState(1)

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
        }
    }, []);

    const connectWallet = async () => {
        setIsLoading(true);
        try {
            if (!window.ethereum) {
                throw new Error('MetaMask is not installed');
            }
            await window.ethereum.enable();
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const signMessage = async (message) => {
        try {
            if (!account) throw new Error('No account connected');
            return await web3.eth.personal.sign(message, account, '');
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const disconnectWallet = () => {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        setAccount(null);
    };

    return (
        <Web3AuthContext.Provider value={{ web3, account, isLoading, error, connectWallet, signMessage, disconnectWallet }}>
            {children}
        </Web3AuthContext.Provider>
    );
};

export { Web3AuthContext, Web3AuthProvider };
