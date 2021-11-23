const Covid = artifacts.require("Covid");
const CovidPool = artifacts.require("CovidPool");

module.exports = function (deployer) {
  deployer.deploy(Covid);
};
