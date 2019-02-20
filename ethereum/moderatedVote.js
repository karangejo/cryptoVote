import web3 from './web3';
import abi from './abi/moderatedVote.json';

// use this to connect to an instance of a bet contract by
// passing in an address 0xec030B4Ff96821218DE282F5e75e3557441Bd2AC
export default (address) => {
  return new web3.eth.Contract(abi,address);
};
