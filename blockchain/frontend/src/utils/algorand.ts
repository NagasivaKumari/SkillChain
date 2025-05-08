import algosdk from 'algosdk';
import { algodClient, SUGGESTED_PARAMS } from '../config/algorand';

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
            const txn = algosdk.makePaymentTxnWithSuggestedParams(
                from.addr,
                to,
                amount,
                undefined,
                undefined,
                params
            );

            const signedTxn = txn.signTxn(from.sk);
            const txId = await algodClient.sendRawTransaction(signedTxn).do();
            
            // Wait for confirmation
            await algosdk.waitForConfirmation(algodClient, txId.txId, 4);
            return txId.txId;
        } catch (error) {
            console.error('Error sending ALGOs:', error);
            throw error;
        }
    }

    // Create an asset
    static async createAsset(
        creator: algosdk.Account,
        assetName: string,
        unitName: string
    ): Promise<number> {
        try {
            const params = await algodClient.getTransactionParams().do();
            const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
                from: creator.addr,
                total: 1,
                decimals: 0,
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
            const confirmedTxn = await algosdk.waitForConfirmation(algodClient, response.txid, 4);
            const assetId = confirmedTxn['asset-index'];
            return assetId;
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
            const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
                account.addr,
                account.addr,
                undefined,
                undefined,
                0,
                undefined,
                assetId,
                params
            );

            const signedTxn = txn.signTxn(account.sk);
            const txId = await algodClient.sendRawTransaction(signedTxn).do();
            
            // Wait for confirmation
            await algosdk.waitForConfirmation(algodClient, txId.txId, 4);
            return txId.txId;
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
            const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
                from.addr,
                to,
                undefined,
                undefined,
                amount,
                undefined,
                assetId,
                params
            );

            const signedTxn = txn.signTxn(from.sk);
            const txId = await algodClient.sendRawTransaction(signedTxn).do();
            
            // Wait for confirmation
            await algosdk.waitForConfirmation(algodClient, txId.txId, 4);
            return txId.txId;
        } catch (error) {
            console.error('Error transferring asset:', error);
            throw error;
        }
    }
} 