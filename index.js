// get the access to the env file
import dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();

// importing the contract abi
import { contractABI } from "./ABI.js";

// import ether
import { ethers } from "ethers";
// const ethers = require("ethers");

const { TESTNET_PRIVATE_KEY, TEST_API_KEY } = process.env;

// create an instance of the provider/connection to the ethereum computer
// ethers.providers.AlchemyProvider( [ network = "homestead" , [ apiKey ] ] )
const provider = new ethers.providers.AlchemyProvider("goerli", TEST_API_KEY);

// creating an instance of a wallet
const wallet = new ethers.Wallet(TESTNET_PRIVATE_KEY, provider);

async function main() {
  // create an instance of the counter contract
  //   ethers.Contract( address , abi , signerOrProvider )
  const counterContract = new ethers.Contract(
    "0x5F91eCd82b662D645b15Fd7D2e20E5e5701CCB7A",
    contractABI,
    wallet
  );

  const value = await counterContract.get();
  const tx = await counterContract.dec();
  console.log(value.toString());
  console.log(tx.hash);
}

main();
