import web3 from './web3';
import abi from './abi/voteFactory.json';

// use this to connect to an instance of a bet contract by
// passing in an address 0xd7eFD3f8329c41002F2942A2E5a9c1c000f6fd60
export default (address) => {
  return new web3.eth.Contract(abi,address);
};
