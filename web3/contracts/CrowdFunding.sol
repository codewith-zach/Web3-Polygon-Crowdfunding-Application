// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image; //image is a string cause we're putting the url
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        //require statement is to check if everything is okay
        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future."
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1; //retuns the index of the most newly created campaign
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value; //what we are trying to send from our frontend

        //Now we get the campaign we are going to donate to
        Campaign storage campaign = campaigns[_id]; //this campaigns is the mapping we created at the top

        campaign.donators.push(msg.sender); //we want to push the address of the person that donated
        campaign.donations.push(amount); //we want to push the amount

        (bool sent, ) = payable(campaign.owner).call{value: amount}(""); //variable that lets us know if the transaction has been sent or not

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        //returns an array of addresses stored in memory and and array of numbers also stored in memory
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns); //we're creating a new variable called allCampaigns which is of type array. We're not actually getting the campaigns, rather we're just creating an empty array with as many empty elements as there are actual campaigns

        //now we loop through all the campaigns and populate the variable
        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
