import fs from "fs";
import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import CollectionConfig from "./config/CollectionConfig";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("environment", "Prints the list of dotenv values", async (taskArgs, hre) => {
    console.log(process.env);
});

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

task("generate-freelist-root-hash", "Generates and prints out the root hash for the current Free List", async () => {
    // Check configuration
    if (CollectionConfig.freelistAddresses.length < 1) {
        throw "The Free List is empty, please add some addresses to the configuration.";
    }

    // Build the Merkle Tree
    const leafNodes = CollectionConfig.freelistAddresses.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const rootHash = "0x" + merkleTree.getRoot().toString("hex");

    console.log("The Merkle Tree root hash for the current Free List is: " + rootHash);
});

task("generate-goldlist-root-hash", "Generates and prints out the root hash for the current Gold List", async () => {
    // Check configuration
    if (CollectionConfig.goldlistAddresses.length < 1) {
        throw "The Gold List is empty, please add some addresses to the configuration.";
    }

    // Build the Merkle Tree
    const leafNodes = CollectionConfig.goldlistAddresses.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const rootHash = "0x" + merkleTree.getRoot().toString("hex");

    console.log("The Merkle Tree root hash for the current Gold List is: " + rootHash);
});

task("generate-freelist-proof", "Generates and prints out the Free List proof for the given address (compatible with block explorers such as Etherscan)", async (taskArgs: { address: string }) => {
    // Check configuration
    if (CollectionConfig.freelistAddresses.length < 1) {
        throw "The Free List is empty, please add some addresses to the configuration.";
    }

    // Build the Merkle Tree
    const leafNodes = CollectionConfig.freelistAddresses.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const proof = merkleTree.getHexProof(keccak256(taskArgs.address)).toString().replace(/'/g, "").replace(/ /g, "");

    console.log("The Free List proof for the given address is: " + proof);
}).addPositionalParam("address", "The public address");

task("generate-goldlist-proof", "Generates and prints out the Gold List proof for the given address (compatible with block explorers such as Etherscan)", async (taskArgs: { address: string }) => {
    // Check configuration
    if (CollectionConfig.goldlistAddresses.length < 1) {
        throw "The Gold List is empty, please add some addresses to the configuration.";
    }

    // Build the Merkle Tree
    const leafNodes = CollectionConfig.goldlistAddresses.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const proof = merkleTree.getHexProof(keccak256(taskArgs.address)).toString().replace(/'/g, "").replace(/ /g, "");

    console.log("The Gold List proof for the given address is: " + proof);
}).addPositionalParam("address", "The public address");

task("rename-contract", "Renames the smart contract replacing all occurrences in source files", async (taskArgs: { newName: string }, hre) => {
    // Validate new name
    if (!/^([A-Z][A-Za-z0-9]+)$/.test(taskArgs.newName)) {
        throw "The contract name must be in PascalCase: https://en.wikipedia.org/wiki/Camel_case#Variations_and_synonyms";
    }

    const oldContractFile = `${__dirname}/contracts/${CollectionConfig.contractName}.sol`;
    const newContractFile = `${__dirname}/contracts/${taskArgs.newName}.sol`;

    if (!fs.existsSync(oldContractFile)) {
        throw `Contract file not found: "${oldContractFile}" (did you change the configuration manually?)`;
    }

    if (fs.existsSync(newContractFile)) {
        throw `A file with that name already exists: "${oldContractFile}"`;
    }

    // Replace names in source files
    replaceInFile(__dirname + "/../minting-dapp/src/scripts/lib/NftContractType.ts", CollectionConfig.contractName, taskArgs.newName);
    replaceInFile(__dirname + "/config/CollectionConfig.ts", CollectionConfig.contractName, taskArgs.newName);
    replaceInFile(__dirname + "/lib/NftContractProvider.ts", CollectionConfig.contractName, taskArgs.newName);
    replaceInFile(oldContractFile, CollectionConfig.contractName, taskArgs.newName);

    // Rename the contract file
    fs.renameSync(oldContractFile, newContractFile);

    console.log(`Contract renamed successfully from "${CollectionConfig.contractName}" to "${taskArgs.newName}"!`);

    // Rebuilding types
    await hre.run("typechain");
}).addPositionalParam("newName", "The new name");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        truffle: {
            url: "http://localhost:24012/rpc",
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
        coinmarketcap: process.env.GAS_REPORTER_COIN_MARKET_CAP_API_KEY,
    },
    etherscan: {
        apiKey: {
            // Ethereum
            rinkeby: process.env.BLOCK_EXPLORER_API_KEY!,
            goerli: process.env.BLOCK_EXPLORER_API_KEY!,
            mainnet: process.env.BLOCK_EXPLORER_API_KEY!,
        },
    },
};

// Setup "testnet" network
if (process.env.NETWORK_TESTNET_URL !== undefined) {
    config.networks!.testnet = {
        url: process.env.NETWORK_TESTNET_URL,
        accounts: [process.env.NETWORK_TESTNET_PRIVATE_KEY!],
    };
}

// Setup "mainnet" network
if (process.env.NETWORK_MAINNET_URL !== undefined) {
    config.networks!.mainnet = {
        url: process.env.NETWORK_MAINNET_URL,
        accounts: [process.env.NETWORK_MAINNET_PRIVATE_KEY!],
    };
}

export default config;

/**
 * Replaces all occurrences of a string in the given file.
 */
function replaceInFile(file: string, search: string, replace: string): void {
    const fileContent = fs.readFileSync(file, "utf8").replace(new RegExp(search, "g"), replace);

    fs.writeFileSync(file, fileContent, "utf8");
}
