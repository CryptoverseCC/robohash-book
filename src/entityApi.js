import React from 'react';
import etherDiamond from './img/ether-diamond.gif';
import Web3 from 'web3';
const {
  REACT_APP_ERC_721_ADDRESS: ERC_721_ADDRESS,
} = process.env;

const roboHashTokenArtifacts = require('./abi/RoboHashToken.json');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'));
const contractInstance = new web3.eth.Contract(roboHashTokenArtifacts, ERC_721_ADDRESS);

export const getEntityData = async entityId => {
  try {
    const responseTokenName = await contractInstance.methods.getTokenName(entityId).call();
    const tokenName = responseTokenName.valueOf();
    const tokenUrl = "http://robohash.org/" + tokenName + ".png";
    return {
      id: entityId,
      name: tokenName,
      image_url: tokenUrl, // image of our entity
      url: `https://robohash.org`, // website with details about particular entity
      color: '#333333' // background color 
    };
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const EntityIcon = entityId => {
  return <img src={etherDiamond} style={{ height: '70%' }} alt={entityId} />;
};

export const entityTranslations = {
  commentPlaceholder: 'Hash your story',
  replyPlaceholder: 'Hash your reply',
  noEntitiesError: 'No robohashes found',
  entityName: 'RoboHash'
};

export const avatarSizes = {
  verySmall: { containerSize: '32px', imgSize: '32px', imgTopOffset: '50%', imgLeftOffset: '50%' },
  small: { containerSize: '44px', imgSize: '44px', imgTopOffset: '50%', imgLeftOffset: '50%' },
  medium: { containerSize: '54px', imgSize: '54px', imgTopOffset: '50%', imgLeftOffset: '50%' },
  large: { containerSize: '64px', imgSize: '64px', imgTopOffset: '50%', imgLeftOffset: '50%' }
};
