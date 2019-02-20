import web3 from './web3';
import abi from './abi/organizationFactory.json'

// this is the address of the latest deployment of the contract
//change this to connect to a different deployment

const address = '0x8c4c19c1bbb45c615349c90ce57aa1299565f3f6';

const instance = new web3.eth.Contract(abi,address);

export default instance;
