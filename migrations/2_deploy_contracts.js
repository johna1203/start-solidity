var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(_deployer, _network, _accounts) {
  const [admin,_] = _accounts;
  _deployer.deploy(SimpleStorage, admin);
};
