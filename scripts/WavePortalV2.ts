import { ethers } from "hardhat"
import { WavePortalV2__factory } from "../typechain-types"

const main = async () => {
    const waveContractFactory = (await ethers.getContractFactory(
        "WavePortalV2"
    )) as WavePortalV2__factory
    const waveContract = await waveContractFactory.deploy()
    await waveContract.deployed()
    console.log("Contract addy:", waveContract.address)

    let waveCount
    waveCount = await waveContract.getTotalWaves()
    console.log(waveCount.toNumber())

    /**
     * Let's send a few waves!
     */
    let waveTxn = await waveContract.wave("A message!")
    await waveTxn.wait() // Wait for the transaction to be mined

    const [_, randomPerson] = await ethers.getSigners()
    waveTxn = await waveContract.connect(randomPerson).wave("Another message!")
    await waveTxn.wait() // Wait for the transaction to be mined

    let allWaves = await waveContract.getAllWaves()
    console.log(allWaves)
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
