import React, { useState } from 'react';
import { useAlgorand } from '../contexts/AlgorandContext';
import './AlgorandTest.css';

const AlgorandTest: React.FC = () => {
    const { account, accountInfo, createAccount, sendAlgos, createAsset } = useAlgorand();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [courseCompleted, setCourseCompleted] = useState(false);
    const [examPassed, setExamPassed] = useState(false);
    const [skillName, setSkillName] = useState('');
    const [skillDescription, setSkillDescription] = useState('');

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

    const handleCourseCompletion = () => {
        setCourseCompleted(true);
        alert('Course completed successfully! Please take the exam.');
    };

    const handleExamCompletion = () => {
        if (!courseCompleted) {
            alert('Please complete the course first!');
            return;
        }
        setExamPassed(true);
        alert('Exam passed successfully! You can now create your certification.');
    };

    const handleCreateSkillCertification = async () => {
        if (!account) {
            alert('Please create an account first');
            return;
        }

        if (!courseCompleted || !examPassed) {
            alert('Please complete the course and pass the exam first!');
            return;
        }

        try {
            const assetId = await createAsset(
                skillName,
                'SKILL'
            );
            alert(`Skill certification created! Asset ID: ${assetId}`);
        } catch (error) {
            console.error('Error creating skill certification:', error);
            alert('Error creating skill certification');
        }
    };

    return (
        <div className="algorand-test">
            <h2>SkillChain Certification System</h2>
            
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

            <div className="course-section">
                <h3>Course Progress</h3>
                <div className="progress-indicators">
                    <div className={`progress-item ${courseCompleted ? 'completed' : ''}`}>
                        <span>Course Completion</span>
                        <button 
                            onClick={handleCourseCompletion}
                            disabled={courseCompleted}
                        >
                            {courseCompleted ? 'Completed' : 'Mark as Complete'}
                        </button>
                    </div>
                    <div className={`progress-item ${examPassed ? 'completed' : ''}`}>
                        <span>Exam Completion</span>
                        <button 
                            onClick={handleExamCompletion}
                            disabled={!courseCompleted || examPassed}
                        >
                            {examPassed ? 'Passed' : 'Take Exam'}
                        </button>
                    </div>
                </div>
            </div>

            {courseCompleted && examPassed && (
                <div className="certification-section">
                    <h3>Create Skill Certification</h3>
                    <input
                        type="text"
                        placeholder="Skill Name"
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Skill Description"
                        value={skillDescription}
                        onChange={(e) => setSkillDescription(e.target.value)}
                    />
                    <button onClick={handleCreateSkillCertification} disabled={!skillName || !skillDescription}>
                        Accept
                    </button>
                </div>
            )}

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