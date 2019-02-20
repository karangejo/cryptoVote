import React, { Component } from 'react';
import moderatedVote from '../ethereum/moderatedVote';
import { Form, Button, Message,Segment } from 'semantic-ui-react';
import web3 from '../ethereum/web3';



class ProposalCanVote extends Component {

  state = {
    errorMessageOne: '',
    errorMessageTwo: '',
    memberStatusOne: '',
    memberStatusTwo: '',
    loadingOne: false,
    loadingTwo: false,
    showMemberStatusOne: false,
    showMemberStatusTwo: false,
  }

  onSubmitOne = async (event) => {
    event.preventDefault();
    const propVote = moderatedVote(this.props.contractAddress);
    this.setState({loadingOne:true,errorMessageOne: '',showMemberStatusOne: false});
    try{
      const accounts = await web3.eth.getAccounts();
      const member = await propVote.methods
        .registered(accounts[0]).call();

        var status = '';

        if(member){
          status = 'You are currently registered as a member of this Organization.';
        } else {
          status = 'You are currently not registered as a member of this Organization.';
        }

      this.setState({memberStatusOne: status ,showMemberStatusOne: true})
    } catch (err) {
      this.setState({errorMessageOne: err.messageOne});
    }
    this.setState({loadingOne:false});
  };

  renderMessageOne(){
    return(
      <Message content={this.state.memberStatusOne}/>
    );
  }

  onSubmitTwo = async (event) => {
    event.preventDefault();
    const propVote = moderatedVote(this.props.contractAddress);
    this.setState({loadingTwo:true,errorMessageTwo: '',showMemberStatusTwo: false});
    try{
      const accounts = await web3.eth.getAccounts();
      const member = await propVote.methods
        .voted(accounts[0]).call();

        var status = '';

        if(member){
          status = 'You have already voted on this Proposal.';
        } else {
          status = 'You have not voted on this Proposal yet.';
        }

      this.setState({memberStatusTwo: status ,showMemberStatusTwo: true})
    } catch (err) {
      this.setState({errorMessageTwo: err.messageTwo});
    }
    this.setState({loadingTwo:false});
  };

  renderMessageTwo(){
    return(
      <Message content={this.state.memberStatusTwo}/>
    );
  }


  render() {
    return (
      <div>
      <Segment raised={true} color="pink" text-align="center">
      <h3>Am I Registered to Vote on this Proposal?</h3>
      <Form onSubmit={this.onSubmitOne} error={!!this.state.errorMessageOne}>
      {this.state.showMemberStatusOne && this.renderMessageOne()}
      <Message error header="Oops!" content={this.state.errorMessageOne}/>
      <Button loading={this.state.loadingOne} primary>Check</Button>
      </Form>
      </Segment>
      <Segment raised={true} color="pink" text-align="center">
      <h3>Can I still vote on this Proposal?</h3>
      <Form onSubmit={this.onSubmitTwo} error={!!this.state.errorMessageTwo}>
      {this.state.showMemberStatusTwo && this.renderMessageTwo()}
      <Message error header="Oops!" content={this.state.errorMessageTwo}/>
      <Button loading={this.state.loadingTwo} primary>Check</Button>
      </Form>
      </Segment>
      </div>
    );
  }

}

export default ProposalCanVote;
