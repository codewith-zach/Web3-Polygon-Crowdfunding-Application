import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ConnectWallet } from '@thirdweb-dev/react';
import CustomButton from './CustomButton';
import { useStateContext } from '../context';
const CustomConnectWallet = () => {
    const navigate = useNavigate();
    const { address } = useStateContext();


  return (
    <div>
      {address ? (
        <CustomButton
          btnType="button"
          title="Create a Campaign"
          styles="bg-[#1dc071]"
          handleClick={() => navigate('create-campaign')}
        />
      ) : (
        <ConnectWallet className="!bg-[#8c6dfd] !text-white !font-semibold  !px-4 !rounded-lg" />
      )}
    </div>
  )
}

export default CustomConnectWallet