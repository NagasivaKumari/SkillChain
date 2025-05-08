import React, { useState } from 'react';
import { useAlgorand } from '../contexts/AlgorandContext';
import './AlgorandTest.css';

const AlgorandTest: React.FC = () => {
    const { account, accountInfo, createAccount, sendAlgos } = useAlgorand();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const handleCreateAccount = async () => {
        try {
            await createAccount();
            alert('Account created successfully!');
        } catch (error) {
            console.error('Error creating account:', error);
            alert('Error creating account');
        }
    };

    const handleSendAlgos = async () => {
        if (!account) {
            alert('Please create an account first');
            return;
        }

        try {
            const txId = await sendAlgos(recipient, Number(amount));
            alert(`Transaction successful! Transaction ID: ${txId}`);
        } catch (error) {
            console.error('Error sending ALGOs:', error);
            alert('Error sending ALGOs');
        }
    };

    return (
        <div className="algorand-test">
            <h2>Algorand Test Component</h2>
            
            <div className="account-section">
                <h3>Account Information</h3>
                {account ? (
                    <div>
                        <p>Address: {account.addr.toString()}</p>
                        <p>Balance: {accountInfo?.amount ? accountInfo.amount / 1000000 : 0} ALGO</p>
                    </div>
                ) : (
                    <p>No account connected</p>
                )}
                <button onClick={handleCreateAccount}>Create New Account</button>
            </div>

            <div className="transfer-section">
                <h3>Send ALGOs</h3>
                <input
                    type="text"
                    placeholder="Recipient Address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount (in ALGOs)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleSendAlgos}>Send ALGOs</button>
            </div>
        </div>
    );
};

export default AlgorandTest; 