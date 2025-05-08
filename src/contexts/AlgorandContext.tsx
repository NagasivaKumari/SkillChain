import React, { createContext, useContext, useState, useEffect } from 'react';
import algosdk from 'algosdk';
import { AlgorandService } from '../utils/algorand';

interface AlgorandContextType {
    account: algosdk.Account | null;
    accountInfo: any | null;
    createAccount: () => Promise<void>;
    connectWallet: () => Promise<void>;
    sendAlgos: (to: string, amount: number) => Promise<string>;
    createAsset: (name: string, unit: string, total: number, decimals: number) => Promise<number>;
    transferAsset: (to: string, assetId: number, amount: number) => Promise<string>;
}

const AlgorandContext = createContext<AlgorandContextType | undefined>(undefined);

export const AlgorandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<algosdk.Account | null>(null);
    const [accountInfo, setAccountInfo] = useState<any | null>(null);

    const createAccount = async () => {
        const newAccount = await AlgorandService.createAccount();
        setAccount(newAccount);
        await updateAccountInfo(newAccount.addr.toString());
    };

    const connectWallet = async () => {
        // This is a placeholder for wallet connection
        // In a real implementation, you would connect to MyAlgo, Pera, or other Algorand wallets
        console.log('Wallet connection not implemented');
    };

    const updateAccountInfo = async (address: string) => {
        try {
            const info = await AlgorandService.getAccountInfo(address);
            setAccountInfo(info);
        } catch (error) {
            console.error('Error updating account info:', error);
        }
    };

    const sendAlgos = async (to: string, amount: number) => {
        if (!account) throw new Error('No account connected');
        const txId = await AlgorandService.sendAlgos(account, to, amount);
        await updateAccountInfo(account.addr.toString());
        return txId;
    };

    const createAsset = async (name: string, unit: string, total: number, decimals: number) => {
        if (!account) throw new Error('No account connected');
        const assetId = await AlgorandService.createAsset(account, name, unit, total, decimals);
        await updateAccountInfo(account.addr.toString());
        return assetId;
    };

    const transferAsset = async (to: string, assetId: number, amount: number) => {
        if (!account) throw new Error('No account connected');
        const txId = await AlgorandService.transferAsset(account, to, assetId, amount);
        await updateAccountInfo(account.addr.toString());
        return txId;
    };

    useEffect(() => {
        if (account) {
            updateAccountInfo(account.addr.toString());
        }
    }, [account]);

    return (
        <AlgorandContext.Provider
            value={{
                account,
                accountInfo,
                createAccount,
                connectWallet,
                sendAlgos,
                createAsset,
                transferAsset,
            }}
        >
            {children}
        </AlgorandContext.Provider>
    );
};

export const useAlgorand = () => {
    const context = useContext(AlgorandContext);
    if (context === undefined) {
        throw new Error('useAlgorand must be used within an AlgorandProvider');
    }
    return context;
}; 