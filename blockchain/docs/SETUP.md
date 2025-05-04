# SkillChain Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- MetaMask or other Web3 wallet
- Hardhat (for local blockchain development)

## Environment Setup

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillchain
JWT_SECRET=your_jwt_secret_key
WEB3_PROVIDER=http://localhost:8545
CONTRACT_ADDRESS=your_contract_address
```

## Installation

### Smart Contracts

1. Navigate to the contracts directory:
```bash
cd blockchain/contracts
```

2. Install dependencies:
```bash
npm install
```

3. Compile contracts:
```bash
npm run compile
```

4. Deploy contracts:
```bash
npm run deploy
```

### Backend

1. Navigate to the backend directory:
```bash
cd blockchain/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Frontend

1. Navigate to the frontend directory:
```bash
cd blockchain/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Project Structure

```
blockchain/
├── contracts/           # Smart contracts
│   ├── CertificateNFT.sol
│   ├── SkillToken.sol
│   └── package.json
├── frontend/           # React application
│   └── package.json
├── backend/            # Node.js API
│   ├── index.js
│   └── package.json
└── docs/              # Documentation
    └── SETUP.md
```

## Development Workflow

1. Start local blockchain:
```bash
npx hardhat node
```

2. Deploy contracts to local network
3. Start backend server
4. Start frontend development server
5. Connect MetaMask to local network (http://localhost:8545)

## Testing

### Smart Contracts
```bash
cd blockchain/contracts
npm test
```

### Backend
```bash
cd blockchain/backend
npm test
```

### Frontend
```bash
cd blockchain/frontend
npm test
``` 