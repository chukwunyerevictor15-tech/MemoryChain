MemoryChain 🧠⛓️

A decentralized memory storage dApp that lets users store meaningful memories on the Ethereum blockchain.

MemoryChain is a Web3 application built with Solidity and Foundry. It allows users to connect their MetaMask wallet, save personal memories directly on-chain, and retrieve those memories from the blockchain.

The goal is to explore how blockchain technology can be used for permanent, verifiable digital memories and personal records.

✨ Features

* 🔐 Connect with MetaMask
* 📝 Create memories with custom titles and content
* ⛓️ Store memories directly on the Ethereum Sepolia testnet
* 📖 Read previously stored memories from the blockchain
* 🕒 Display the timestamp of each memory
* 👛 Display the wallet address that saved each memory
* 🔗 On-chain ownership through msg.sender
* 📱 Responsive frontend interface
* 🟢 Visual wallet connection status
* 🧪 Foundry-based smart contract tests

🛠️ Tech Stack

* Solidity — Smart contract development
* Foundry — Development, testing, and deployment
* Ethers.js — Frontend blockchain interaction
* MetaMask — Wallet connection and transaction signing
* HTML / CSS / JavaScript — Frontend
* Ethereum Sepolia — Test network

🏗️ Project Structure

MemoryChain/
├── src/
│   └── MemoryChain.sol
├── test/
│   └── MemoryChain.t.sol
├── script/
│   └── DeployMemoryChain.s.sol
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── MemoryChain.json
├── broadcast/
│   └── DeployMemoryChain.s.sol/
├── foundry.toml
└── README.md

⚙️ Smart Contract

The MemoryChain contract stores memories using the following information:

* Title
* Content
* Timestamp
* Owner address

Each memory is stored on-chain and can be retrieved through the contract.

Main Functions

addMemory(string memory _title, string memory _content)

Adds a new memory to the blockchain.

getMemory(uint256 _index)

Retrieves a specific memory.

getMemoryCount()

Returns the total number of stored memories.

🧪 Testing

The project uses Foundry for smart contract testing.

Run:

forge build

Then:

forge test

🚀 Running the Frontend

From the project directory:

cd frontend
python3 -m http.server 8000

Then open:

http://localhost:8000

Connect MetaMask to the Sepolia network and connect your wallet.

You can then create and save memories through the frontend.

🌐 Deployment

The MemoryChain smart contract is deployed on the Ethereum Sepolia testnet.

The frontend connects to the deployed contract using its contract address and ABI.

This project is currently intended for learning and demonstration purposes on a test network.

🔄 How It Works

User
  ↓
Frontend
  ↓
MetaMask
  ↓
Ethereum Sepolia
  ↓
MemoryChain Smart Contract
  ↓
Memory stored on-chain
  ↓
Frontend retrieves and displays memory

🎯 Project Purpose

MemoryChain was created as a practical Web3 project to demonstrate how a decentralized application can combine:

* Smart contracts
* Wallet authentication
* Blockchain transactions
* On-chain data storage
* Frontend blockchain interaction
* Automated smart contract testing

👨🏽‍💻 Author

Chukwunyere Victor

Built as a Web3 development project while learning Solidity, Foundry, and decentralized application development.

📄 License

This project is licensed under the MIT License.