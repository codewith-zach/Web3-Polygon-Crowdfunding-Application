import React from 'react'
import { useNavigate } from 'react-router-dom'

import FundCard from './FundCard'
import { loader } from '../assets' 

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
    const navigate = useNavigate();
    const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign }) //the data of the campaign we clicked on is passed through state  to the campaign details page
  }

  return (
    <div>
        <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>{title} ({campaigns.length})</h1>

        <div className='flex flex-wrap mt-[20px] gap-[26px]'>
            {isLoading && (
                <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            )}

            {!isLoading && campaigns.length === 0 && (
                <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                    You have not created any campigns yet
                </p>
            )}
            {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
                key={campaign.id}
                {...campaign}  //spreading out all the campaign properties so we can get them through props
                handleClick={() => handleNavigate(campaign)}
            />)}
        </div>
    </div>
  )
}

export default DisplayCampaigns