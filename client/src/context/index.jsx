import React, {useContext, createContext} from "react";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from 'ethers';




const StateContext = createContext();

export const StateContextProvider = ({ children }) => {    //this allows us to wrap our entire application with the context provider but then still render alll of the children that are inside of it
  const { contract } = useContract('0xe2319d6C9b00bF5Be2711AFe4138B5c39b369f12');

    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');  //this is going to allow us to simply call this function and create a campaign by passing all of the parameters to it

  const address = useAddress(); 
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image,
      ],
      })

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');
    console.log(campaigns);

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));
    
    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }

  return (     
    <StateContext.Provider   ////we're now sharing these across all our pages
      value={{ 
        address,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children} 
    </StateContext.Provider>
  )
}

//there has to be a way for us to utilize that context so we can create a custom Hook
export const useStateContext = () => useContext(StateContext);
//this wouldn't work if we do not wrap our entire app within that context. We go to our main.jsx and import the state context provider from ./context, then we wrap our application with it 