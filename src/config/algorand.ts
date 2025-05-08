import algosdk from 'algosdk';

// Algorand node configuration
export const algodServer = 'https://testnet-api.algonode.cloud';
export const algodPort = 443;
export const algodToken = '';

// Create Algorand client
export const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// Application configuration
export const APP_ID = 0; // Replace with your deployed application ID
export const MIN_BALANCE = 100000; // Minimum balance required for an account (0.1 ALGO)

// Asset configuration
export const ASSET_ID = 0; // Replace with your created asset ID

// Network configuration
export const NETWORK = 'testnet'; // 'mainnet' or 'testnet'

// Transaction configuration
export const SUGGESTED_PARAMS = {
    fee: 1000,
    firstRound: 0,
    lastRound: 0,
    genesisID: '',
    genesisHash: '',
    flatFee: false
}; 