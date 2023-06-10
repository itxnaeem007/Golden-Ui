
const Networks = [

    {
      // name: "Polygon",
      name: "Rinkeby",
      icon: "./assets/images/etherum.png",
      selectIcon: "./assets/images/etherum.png",
      // chainName: "polygon-mainnet",
      chainName: "Rinkeby-testnet",
      // chainId: 137,
      chainId: 4,
      // rpcUrls: ["https://rpc-mainnet.maticvigil.com/v1/71b393674f070620b17f5605ca77fe6c9cce093f"],
      rpcUrls : ["https://rinkeby.infura.io/v3/c4eca0a0bdfc41028e1df062238c527b"],
      nativeCurrency: {
        name: "WETH",
        symbol: "WETH",
        decimals: 18,
      },
      // blockExplorerUrl: "https://polygonscan.com/",
      blockExplorerUrl : "https://rinkeby.etherscan.io/",
      address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      eventKey: "matic",
    },
    
  ];
  
  export default Networks;