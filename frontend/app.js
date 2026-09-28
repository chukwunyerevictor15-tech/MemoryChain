const CONTRACT_ADDRESS = "0x7e92ede578bf0fb40669dc8f0f42e262b590a085";

const CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_content",
                "type": "string"
            }
        ],
        "name": "addMemory",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "getMemory",
        "outputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMemoryCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

console.log("MemoryChain frontend loaded!");
let provider;
let signer;
let contract;

async function connectWallet() {
    if (!window.ethereum) {
        alert("Please install MetaMask.");
        return;
    }

    try {
        provider = new ethers.BrowserProvider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        signer = await provider.getSigner();
const network = await provider.getNetwork();

if (network.chainId !== 11155111n) {
    alert("Please switch MetaMask to the Sepolia network.");
    return;
}
        contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer
        );

        const address = await signer.getAddress();

        console.log("Wallet connected:", address);
        connectBtn.textContent =
    address.slice(0, 6) + "..." + address.slice(-4);
    connectBtn.classList.add("connected");
        alert("Wallet connected successfully!");
        await loadMemories();
    } catch (error) {
        console.error(error);
        alert("Wallet connection failed.");
    }
}
const connectBtn = document.getElementById("connect-btn");

connectBtn.addEventListener("click", connectWallet);
const saveMemoryBtn = document.getElementById("saveMemoryBtn");
const memoryInput = document.getElementById("memoryInput");

saveMemoryBtn.addEventListener("click", async function () {
   const memory = memoryInput.value.trim();
const memoryTitle = document.getElementById("memoryTitle");
const title = memoryTitle.value.trim();

if (title === "") {
    alert("Please enter a title for your memory.");
    return;
}

if (memory === "") {
        alert("Please write a memory before saving.");
        return;
    }

    if (!contract) {
        alert("Please connect your wallet first.");
        return;
    }

    try {
        saveMemoryBtn.disabled = true;
        saveMemoryBtn.textContent = "Saving...";

       const tx = await contract.addMemory(title, memory);
        await tx.wait();

        alert("Memory saved to the blockchain!");

        memoryInput.value = "";
    } catch (error) {
        console.error(error);
        alert("Failed to save memory.");
    } finally {
        saveMemoryBtn.disabled = false;
        saveMemoryBtn.textContent = "Save to Blockchain";
    }
});
async function loadMemories() {
    if (!contract) {
        return;
    }

    try {
        const count = await contract.getMemoryCount();
        const memoriesList = document.getElementById("memoriesList");

        memoriesList.innerHTML = "";
        if (count === 0n) {
    memoriesList.innerHTML = `
        <div class="empty-state">
            <h3>No memories yet</h3>
            <p>Your first blockchain memory will appear here.</p>
        </div>
    `;
    return;
}

        for (let i = 0; i < count; i++) {
            const memory = await contract.getMemory(i);

            const memoryDiv = document.createElement("div");

           const date = new Date(Number(memory[2]) * 1000);

const shortAddress =
    memory[3].slice(0, 6) + "..." + memory[3].slice(-4);

memoryDiv.innerHTML = "";

const header = document.createElement("div");
header.className = "memory-card-header";

const badge = document.createElement("span");
badge.className = "memory-badge";
badge.textContent = "ON-CHAIN MEMORY";

const dateSpan = document.createElement("span");
dateSpan.className = "memory-date";
dateSpan.textContent = date.toLocaleString();

header.appendChild(badge);
header.appendChild(dateSpan);

const title = document.createElement("h3");
title.textContent = memory[0];

const content = document.createElement("p");
content.textContent = memory[1];

const ownerDiv = document.createElement("div");
ownerDiv.className = "memory-owner";
ownerDiv.textContent = `🔐 Saved by ${shortAddress}`;

memoryDiv.appendChild(header);
memoryDiv.appendChild(title);
memoryDiv.appendChild(content);
memoryDiv.appendChild(ownerDiv);

            memoriesList.appendChild(memoryDiv);
        }
    } catch (error) {
        console.error("Error loading memories:", error);
    }
}