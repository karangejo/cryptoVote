import React, { Component } from 'react';
import moderatedVote from '../ethereum/moderatedVote';
import { Form, Button, Input, Message,Segment } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ProposalVote extends Component {
  state = {
    errorMessageOne: '',
    errorMessageTwo: '',
    erroeMessageThree: '',
    loadingOne: false,
    loadingTwo: false,
    loadingThree: false
  }

  onSubmitOne = async (event) => {
    event.preventDefault();
    const propVote = moderatedVote(this.props.contractAddress);
    this.setState({loadingOne:true,errorMessageOne: ''});
    try{
      const accounts = await web3.eth.getAccounts();
      await propVote.methods
        .votePositive()
        .send({
          from: accounts[0]
        });
    Router.pushRoute(`/orgs/${this.props.parentAddress}/proposals/${this.props.contractAddress}`);
    } catch (err) {
      this.setState({errorMessageOne: err.message});
    }
    this.setState({loadingOne:false});
  };

  onSubmitTwo = async (event) => {
    event.preventDefault();
    const propVote = moderatedVote(this.props.contractAddress);
    this.setState({loadingTwo:true,errorMessageTwo: ''});
    try{
      const accounts = await web3.eth.getAccounts();
      await propVote.methods
        .voteNegative()
        .send({
          from: accounts[0]
        });
      Router.pushRoute(`/orgs/${this.props.parentAddress}/proposals/${this.props.contractAddress}`);
    } catch (err) {
      this.setState({errorMessageTwo: err.message});
    }
    this.setState({loadingTwo:false});
  };

  onSubmitThree = async (event) => {
    event.preventDefault();
    const propVote = moderatedVote(this.props.contractAddress);
    this.setState({loadingThree:true,errorMessageThree: ''});
    try{
      const accounts = await web3.eth.getAccounts();
      await propVote.methods
        .declareWinner()
        .send({
          from: accounts[0]
        });
      Router.pushRoute(`/orgs/${this.props.parentAddress}/proposals/${this.props.contractAddress}`);
    } catch (err) {
      this.setState({errorMessageThree: err.message});
    }
    this.setState({loadingThree:false});
  };


  render() {
    return (
      <div>
      <Segment raised={true} color="red" text-align="center">
        <h3>Approve the Proposal</h3>
        <Form onSubmit={this.onSubmitOne} error={!!this.state.errorMessageOne}>
          <Message error header="Oops!" content={this.state.errorMessageOne}/>
          <Button loading={this.state.loadingOne} primary>Approve</Button>
          </Form>
      </Segment>
      <Segment raised={true} color="green" text-align="center">
        <h3>Disapprove the Proposal</h3>
        <Form onSubmit={this.onSubmitTwo} error={!!this.state.errorMessageTwo}>
          <Message error header="Oops!" content={this.state.errorMessageTwo}/>
          <Button loading={this.state.loadingTwo} primary>Disapprove</Button>
        </Form>
        </Segment>
        <Segment raised={true} color="purple" text-align="center">
          <h3>Finalize Vote</h3>
          <h6>(Manager Only)</h6>
          <Form onSubmit={this.onSubmitThree} error={!!this.state.errorMessageThree}>
            <Message error header="Oops!" content={this.state.errorMessageThree}/>
            <Button loading={this.state.loadingThree} primary>Finalize</Button>
          </Form>
          </Segment>
        </div>
    );
  }

}

export default ProposalVote;
