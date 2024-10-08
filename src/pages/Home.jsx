import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWalletClient } from "wagmi";
// import { useEthersSigner } from "./utils/ethers";
import CustomTokenABI from "../utils/constant.json";
import { useEthersSigner } from "../utils/ethers";
import { ethers } from "ethers";
import { BiSolidCopy } from "react-icons/bi";
function Home() {
  const { data: walletClient } = useWalletClient();
  const [activeStep, setActiveStep] = useState(0);
  const [deployedAddress, setDeployedAddress] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    initialSupply: "",
    ownerAddress: "",
  });
  const { name, symbol, initialSupply, ownerAddress } = formData;
  const signer = useEthersSigner();
  const steps = [
    "Connect Wallet",
    "Input Token details",
    "Creating Contract",
    "Contract is ready, Copy address",
  ];

  useEffect(() => {
    if (walletClient) {
      // console.log(walletClient.account.address);
      setActiveStep(1);
    }
  }, [walletClient]);

  const copyaddress = async () => {
    await navigator.clipboard.writeText(deployedAddress);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createContract = async (e) => {
    e.preventDefault();
    if (
      name !== "" &&
      symbol !== "" &&
      initialSupply !== "" &&
      ownerAddress !== ""
    ) {
      setActiveStep(2);
      const factory = new ethers.ContractFactory(
        CustomTokenABI.abi, // ABI of the contract
        CustomTokenABI.bytecode, // Bytecode of the contract
        signer
      );
      try {
        // Deploy the contract with constructor arguments
        const contract = await factory.deploy(
          name,
          symbol,
          ethers.utils.parseEther(initialSupply),
          ownerAddress
        );

        // Wait for the contract to be mined
        await contract.deployed();
        setDeployedAddress(contract.address);
      setActiveStep(3);
      } catch (error) {
        console.error("Contract deployment failed", error);
      }
    }
  };

  return (
    <div className="home">
      <div className="text">
        <h1>SEI TOKEN GENERATOR</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo illum
          vitae ea reprehenderit est consequuntur iure quaerat! Iure quam
          eveniet officia aspernatur voluptatibus odio laboriosam veniam quod
          porro. Cum, inventore.
        </p>
        <ul>
          {steps.map((step, index) => (
            <li
              key={index}
              className={`step ${index === activeStep ? "active" : ""}`}
            >
              <span>{index + 1}</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
      <form action="">
        {activeStep === 0 ? (
          <div className="connectCont">
            <ConnectButton />
          </div>
        ) : activeStep === 1 ? (
          <div className="details">
            <h1>Token Generator</h1>
            <div className="rows">
              <label>Token Name:</label>
              <input
                type="text"
                value={name}
                onChange={handleInputChange}
                required
                name="name"
              />
            </div>
            <div className="rows">
              <label>Token Symbol:</label>
              <input
                type="text"
                value={symbol}
                onChange={handleInputChange}
                required
                name="symbol"
              />
            </div>
            <div className="rows">
              <label>Initial Supply:</label>
              <input
                type="number"
                name="initialSupply"
                required
                value={initialSupply}
                onChange={handleInputChange}
              />
            </div>
            <div className="rows">
              <label>Owner Address:</label>
              <input
                type="text"
                name="ownerAddress"
                required
                value={ownerAddress}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={createContract}>Create</button>
          </div>
        ) : activeStep === 2 ? (
          <div className="loadingCont">
            <div class="loader"></div>
          </div>
        ) : (
          <div className="addCont">
            <div className="subCont">
              <h2>{deployedAddress}</h2>
              <BiSolidCopy className="copyBtn" onClick={copyaddress} />
            </div>
            <button
              onClick={(e) => {
                setActiveStep(1);
              }}
            >
              Go back
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Home;
