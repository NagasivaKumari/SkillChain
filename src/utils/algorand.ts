import algosdk from 'algosdk';
import { algodClient } from '../config/algorand';

export class AlgorandService {
    // Create a new account
    static async createAccount(): Promise<algosdk.Account> {
        return algosdk.generateAccount();
    }

    // Get account information
    static async getAccountInfo(address: string) {
        try {
            const accountInfo = await algodClient.accountInformation(address).do();
            return accountInfo;
        } catch (error) {
            console.error('Error getting account info:', error);
            throw error;
        }
    }

    // Send ALGOs
    static async sendAlgos(
        from: algosdk.Account,
        to: string,
        amount: number
    ): Promise<string> {
        try {
            const params = await algodClient.getTransactionParams().do();
            const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                sender: from.addr,
                receiver: to,
                amount: amount,
                suggestedParams: params
            });

            const signedTxn = txn.signTxn(from.sk);
            const response = await algodClient.sendRawTransaction(signedTxn).do();
            
            // Wait for confirmation
            await algosdk.waitForConfirmation(algodClient, response.txid, 4);
            return response.txid;
        } catch (error) {
            console.error('Error sending ALGOs:', error);
            throw error;
        }
    }

    // Create an asset
    static async createAsset(
        creator: algosdk.Account,
        assetName: string,
        unitName: string,
        total: number,
        decimals: number
    ): Promise<number> {
        try {
            const params = await algodClient.getTransactionParams().do();
            const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
                sender: creator.addr,
                total: total,
                decimals: decimals,
                defaultFrozen: false,
                manager: creator.addr,
                reserve: creator.addr,
                freeze: creator.addr,
                clawback: creator.addr,
                assetName: assetName,
                unitName: unitName,
                suggestedParams: params
            });

            const signedTxn = txn.signTxn(creator.sk);
            const response = await algodClient.sendRawTransaction(signedTxn).do();
            
            // Wait for confirmation
            const confirmedTxn = await algosdk.waitForConfirmation(algodClient, response.txid, 4);
            const assetId = confirmedTxn.assetIndex;
            
            if (assetId === undefined) {
                throw new Error('Asset creation failed: No asset index returned');
            }
            
            // Convert bigint to number
            return Number(assetId);
        } catch (error) {
            console.error('Error creating asset:', error);
            throw error;
        }
    }

    // Opt-in to an asset
    static async optInToAsset(
        account: algosdk.Account,
        assetId: number
    ): Promise<string> {
        try {
            const params = await algodClient.getTransactionParams().do();
            const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                sender: account.addr,
                receiver: account.addr,
                amount: 0,
                assetIndex: assetId,
                suggestedParams: params
            });

            const signedTxn = txn.signTxn(account.sk);
            const response = await algodClient.sendRawTransaction(signedTxn).do();
            
            // Wait for confirmation
            await algosdk.waitForConfirmation(algodClient, response.txid, 4);
            return response.txid;
        } catch (error) {
            console.error('Error opting in to asset:', error);
            throw error;
        }
    }

    // Transfer an asset
    static async transferAsset(
        from: algosdk.Account,
        to: string,
        assetId: number,
        amount: number
    ): Promise<string> {
        try {
            const params = await algodClient.getTransactionParams().do();
            const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                sender: from.addr,
                receiver: to,
                amount: amount,
                assetIndex: assetId,
                suggestedParams: params
            });

            const signedTxn = txn.signTxn(from.sk);
            const response = await algodClient.sendRawTransaction(signedTxn).do();
            
            // Wait for confirmation
            await algosdk.waitForConfirmation(algodClient, response.txid, 4);
            return response.txid;
        } catch (error) {
            console.error('Error transferring asset:', error);
            throw error;
        }
    }
} 