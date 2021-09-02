require("dotenv").config();
const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 8545,
      host: "127.0.0.1",
      network_id:'*'
    },
    bsc_test: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.RPC_SERVER_BSC_TEST, 0),
      network_id: 97,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
