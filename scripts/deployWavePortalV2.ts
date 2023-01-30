import { ethers } from "hardhat"
import { WavePortalV2__factory } from "../typechain-types"

const main = async () => {
    console.log("\n---------- Deploying WavePortalV2 Contract ----------\n")

    const [deployer] = await ethers.getSigners()
    const accountBalance = await deployer.getBalance()

    console.log("\nDeploying contracts with account: ", deployer.address)
    console.log("\nAccount balance: ", accountBalance.toString())

    const waveContractFactory = (await ethers.getContractFactory(
        "WavePortalV2"
    )) as WavePortalV2__factory
    const waveContract = await waveContractFactory.deploy()
    await waveContract.deployed()

    console.log("\nWavePortalV2 address: ", waveContract.address)
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()
