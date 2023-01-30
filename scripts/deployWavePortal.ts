import { ethers } from "hardhat"
import { WavePortal__factory } from "../typechain-types"

const main = async () => {
    console.log("\n---------- Deploying WavePortal Contract ----------\n")

    const [deployer] = await ethers.getSigners()
    const accountBalance = await deployer.getBalance()

    console.log("\nDeploying contracts with account: ", deployer.address)
    console.log("\nAccount balance: ", accountBalance.toString())

    const waveContractFactory = (await ethers.getContractFactory(
        "WavePortal"
    )) as WavePortal__factory
    const waveContract = await waveContractFactory.deploy()
    await waveContract.deployed()

    console.log("\nWavePortal address: ", waveContract.address)
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
