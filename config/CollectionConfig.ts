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
    hiddenMetadataUri: "ipfs://QmbidwWmqXq25yQyL1pWAAaXpUVGrkEHCcNtSuRUAK73Mh/xastro_prereveal.json",
    contractMetadataUri: "ipfs://QmevYYcbLamwxrEQU6tnXMoqH9HubiGvEEAJHTUj7nAeuu",
    maxSupply: 100,
    freelistSale: {
        price: 0.0,
        mintLimit: 5,
        maxMintAmountPerTx: 1,
    },
    goldlistSale: {
        price: 0.001,
        mintLimit: 10,
        maxMintAmountPerTx: 1,
    },
    preSale: {
        price: 0.002,
        mintLimit: 15,
        maxMintAmountPerTx: 3,
    },
    publicSale: {
        price: 0.003,
        mintLimit: 100,
        maxMintAmountPerTx: 5,
    },
    contractAddress: "0xfAd726e7BBafE77E4c6fB2547F50473Fc178F1F8",
    //contractAddress: "0xFFbBbCCC990bf3205467F8Fd3f656aa72F86817a",
    marketplaceIdentifier: "my-nft-token",
    marketplaceConfig: openSea,
    freelistAddresses: freelistAddresses,
    goldlistAddresses: goldlistAddresses,
    tokenContractName: "DeixaToken",
    tokenContractAddress: "0x60A0E01A1AFc273533aE03F8693dce52F8cD0C1b",
    stakingContractName: "DeixaXastroStaking",
    stakingContractAddress: "0x00D393033DC6a029e2A4952fBd6960A712E02C2f",
};

export default CollectionConfig;
