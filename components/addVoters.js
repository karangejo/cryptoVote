import React, { Component } from 'react';
import proposalFactory from '../ethereum/voteFactory';
import { Form, Button, Input, Message,Segment } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import { Router } from '../routes';
 
class AddVoters extends Component {
  state = {
    errorMessageOne: '',
    errorMessageTwo: '',
    newVoterAddress: '',
    newVoterAddresses: '',
    loadingOne: false,
    loadingTwo: false
  }

  onSubmitOne = async (event) => {
    event.preventDefault();
    const propFac = proposalFactory(this.props.contractAddress);
    this.setState({loadingOne:true,errorMessageOne: ''});
    try{
      const accounts = await web3.eth.getAccounts();
      await propFac.methods
        .registerOneVoter(this.state.newVoterAddress)
        .send({
          from: accounts[0]
        });
      Router.pushRoute(`/orgs/${this.props.contractAddress}`);
    } catch (err) {
      this.setState({errorMessageOne: err.message});
    }
    this.setState({loadingOne:false});
  };

  onSubmitTwo = async (event) => {
    event.preventDefault();
    const propFac = proposalFactory(this.props.contractAddress);
    this.setState({loadingTwo:true,errorMessageTwo: ''});
    const registerList = this.state.newVoterAddresses.split(',');
    try{
      const accounts = await web3.eth.getAccounts();
      await propFac.methods
        .registerVoters(registerList)
        .send({
          from: accounts[0]
        });
      Router.pushRoute(`/orgs/${this.props.contractAddress}`);
    } catch (err) {
      this.setState({errorMessageTwo: err.message});
    }
    this.setState({loadingTwo:false});
  };


  render() {
    return (
      <div>
      <Segment raised={true} color="red" text-align="center">
      <h3>Register One New Voter</h3>
      <Form onSubmit={this.onSubmitOne} error={!!this.state.errorMessageOne}>
      <Form.Field>
        <label>Enter New Voter's Address</label>
        <Input
          label="Address"
          labelPosition="right"
          value={this.state.newVoterAddress}
          onChange={event =>
            this.setState({newVoterAddress: event.target.value})}
        />
      </Form.Field>
      <Message error header="Oops!" content={this.state.errorMessageOne}/>
      <Button loading={this.state.loadingOne} primary>Register</Button>
    </Form>
    </Segment>
    <Segment raised={true} color="green" text-align="center">
    <h3>Register Many New Voters</h3>
    <Form onSubmit={this.onSubmitTwo} error={!!this.state.errorMessageTwo}>
    <Form.Field>
      <label>Enter a Comma Separated List of Addresses</label>
      <Input
        label="Addresses"
        labelPosition="right"
        value={this.state.newVoterAddresses}
        onChange={event =>
          this.setState({newVoterAddresses: event.target.value})}
      />
    </Form.Field>
    <Message error header="Oops!" content={this.state.errorMessageTwo}/>
    <Button loading={this.state.loadingTwo} primary>Register</Button>
  </Form>
  </Segment>
  </div>
    );
  }

}

export default AddVoters;
