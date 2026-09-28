// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MemoryChain} from "../src/MemoryChain.sol";

contract MemoryChainTest is Test {
    MemoryChain memoryChain;

    function setUp() public {
        memoryChain = new MemoryChain();
    }

    function testAddMemory() public {
        memoryChain.addMemory(
            "My First Memory",
            "I am building my first blockchain project."
        );

        assertEq(memoryChain.getMemoryCount(), 1);

        (
            string memory title,
            string memory content,
            ,
        ) = memoryChain.getMemory(0);

        assertEq(title, "My First Memory");
        assertEq(content, "I am building my first blockchain project.");
    }

    function testMemoryCount() public {
        assertEq(memoryChain.getMemoryCount(), 0);

        memoryChain.addMemory(
            "Memory One",
            "This is my first memory."
        );

        memoryChain.addMemory(
            "Memory Two",
            "This is my second memory."
        );

        assertEq(memoryChain.getMemoryCount(), 2);
    }

function testMemoryOwnerAndTimestamp() public {
    address user = address(0x123);

    vm.prank(user);

    memoryChain.addMemory(
        "Test Memory",
        "Testing owner and timestamp."
    );

    (
        ,
        ,
        uint256 timestamp,
        address owner
    ) = memoryChain.getMemory(0);

    assertEq(owner, user);
    assertGt(timestamp, 0);
}
}