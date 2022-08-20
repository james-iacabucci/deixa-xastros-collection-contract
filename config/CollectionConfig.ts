import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import { ethereumTestnet, ethereumMainnet } from "../lib/Networks";
import { openSea } from "../lib/Marketplaces";
import freelistAddresses from "./freelist.json";
import goldlistAddresses from "./goldlist.json";

const CollectionConfig: CollectionConfigInterface = {
    testnet: ethereumTestnet,
    mainnet: ethereumMainnet,
    // The contract name can be updated using the following command:
    // yarn rename-contract NEW_CONTRACT_NAME
    // Please DO NOT change it manually!
    contractName: "DeixaXastroCollection",
    tokenName: "DeixaXastro",
    tokenSymbol: "XASTRO",
    hiddenMetadataUri: "ipfs://QmVtimrJehHvNCixH6d34MaWkpCgETHVQf56ADvj4mB6hd/xastro_prereveal.json",
    contractMetadataUri: "ipfs://QmS2jwuCnGYHwUsHc4v7gyckeUh6bf96RBe4eznDd4tpFh",
    maxSupply: 14444,
    freelistSale: {
        price: 0.0,
        mintLimit: 0,
        maxMintAmountPerTx: 1,
    },
    goldlistSale: {
        price: 0.25,
        mintLimit: 444,
        maxMintAmountPerTx: 1,
    },
    preSale: {
        price: 0.25,
        mintLimit: 4444,
        maxMintAmountPerTx: 4,
    },
    publicSale: {
        price: 0.28,
        mintLimit: 14444,
        maxMintAmountPerTx: 4,
    },
    contractAddress: "0xa3958C6c92A8afE6ab1EE07B639E7e9AB47f90B4",
    marketplaceIdentifier: "my-nft-token",
    marketplaceConfig: openSea,
    freelistAddresses: freelistAddresses,
    goldlistAddresses: goldlistAddresses,
};

export default CollectionConfig;
