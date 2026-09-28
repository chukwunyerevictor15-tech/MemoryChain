// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MemoryChain {
    struct Memory {
        string title;
        string content;
        uint256 timestamp;
        address owner;
    }

    Memory[] private memories;

    function addMemory(
        string memory _title,
        string memory _content
    ) public {
        memories.push(
            Memory({
                title: _title,
                content: _content,
                timestamp: block.timestamp,
                owner: msg.sender
            })
        );
    }

    function getMemory(uint256 _index)
        public
        view
        returns (
            string memory title,
            string memory content,
            uint256 timestamp,
            address owner
        )
    {
        Memory memory memoryItem = memories[_index];

        return (
            memoryItem.title,
            memoryItem.content,
            memoryItem.timestamp,
            memoryItem.owner
        );
    }

    function getMemoryCount() public view returns (uint256) {
        return memories.length;
    }
}