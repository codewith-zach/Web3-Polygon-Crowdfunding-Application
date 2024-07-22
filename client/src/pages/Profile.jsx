import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components'
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {  //we created this because We cannot call an async function directly inside a useEffect hook. In other words, we cannot await, and the result of this function needs to be awaited
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);


  return (
    <DisplayCampaigns
      title='All Campaigns'
      isLoading={isLoading}
      campaigns={campaigns} 
    />
      
  )
}

export default Profile