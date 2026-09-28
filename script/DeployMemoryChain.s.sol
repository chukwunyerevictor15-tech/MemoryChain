// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {MemoryChain} from "../src/MemoryChain.sol";

contract DeployMemoryChain is Script {
    function run() external returns (MemoryChain) {
        vm.startBroadcast();

        MemoryChain memoryChain = new MemoryChain();

        vm.stopBroadcast();

        return memoryChain;
    }
}