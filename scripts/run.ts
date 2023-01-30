import { ethers } from "hardhat"
import { WavePortal__factory } from "../typechain-types"

const main = async () => {
    console.log("\n---------- Deploying WavePortal Contract ----------\n")

    const [owner, randomPerson] = await ethers.getSigners()
    const wavePortalFactory = (await ethers.getContractFactory(
        "WavePortal"
    )) as WavePortal__factory
    const waveContract = await wavePortalFactory.deploy()
    await waveContract.deployed()

    console.log("\nContract deployed to:", waveContract.address)
    console.log("\nContract deployed by:", owner.address)

    await waveContract.getTotalWaves()

    const firstWaveTxn = await waveContract.wave()
    await firstWaveTxn.wait()

    await waveContract.getTotalWaves()

    const secondWaveTxn = await waveContract.connect(randomPerson).wave()
    await secondWaveTxn.wait()

    await waveContract.getTotalWaves()
}

const runMain = async () => {
    try {
        await main()
        process.exit(0) // exit Node process without error
    } catch (error) {
        console.log(error)
        process.exit(1) // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
}

runMain()
