const Covid = artifacts.require("Covid");
const FirstcomeAirdrop = artifacts.require('FirstcomeAirdrop');

module.exports = async function (deployer) {
  await deployer.deploy(Covid);
  const covid = await Covid.deployed();
  const covidAddress = await covid.address;
  const swapPoolAddress = await covid.swapPool();

  await deployer.deploy(FirstcomeAirdrop, covidAddress, swapPoolAddress);
};