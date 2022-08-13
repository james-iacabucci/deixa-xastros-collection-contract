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
    maxSupply: 50,
    freelistSale: {
        price: 0.0,
        mintLimit: 0,
        maxMintAmountPerTx: 1,
    },
    goldlistSale: {
        price: 0.001,
        mintLimit: 10,
        maxMintAmountPerTx: 1,
    },
    preSale: {
        price: 0.002,
        mintLimit: 25,
        maxMintAmountPerTx: 5,
    },
    publicSale: {
        price: 0.003,
        mintLimit: 500,
        maxMintAmountPerTx: 10,
    },
    contractAddress: "0xc07F5426915389a7cF29d0829a38DAc3141abdB4",
    marketplaceIdentifier: "my-nft-token",
    marketplaceConfig: openSea,
    freelistAddresses: freelistAddresses,
    goldlistAddresses: goldlistAddresses,
};

export default CollectionConfig;
