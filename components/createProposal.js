import React, { Component } from 'react';
import proposalFactory from '../ethereum/voteFactory';
import { Form, Button, Input, Message,Segment } from 'semantic-ui-react';
import web3 from '../ethereum/web3';



class CreateProposal extends Component {

  state = {
    errorMessage: '',
    proposalStatement: '',
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const propFac = proposalFactory(this.props.contractAddress);
    this.setState({loading:true,errorMessage: ''});
    try{
      const accounts = await web3.eth.getAccounts();
      await propFac.methods
        .createProposal(this.state.proposalStatement)
        .send({
          from: accounts[0]
        });
    } catch (err) {
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:false});
  };


  render() {
    return (
      <Segment raised={true} color="pink" text-align="center">
      <h3>Create a New Proposal</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
      <Form.Field>
        <label>Enter Your Proposal</label>
        <Input
          label="Proposal"
          labelPosition="right"
          value={this.state.proposalStatement}
          onChange={event =>
            this.setState({proposalStatement: event.target.value})}
        />
      </Form.Field>
      <Message error header="Oops!" content={this.state.errorMessage}/>
      <Button loading={this.state.loading} primary>Create</Button>
    </Form>
      </Segment>
    );
  }

}

export default CreateProposal;
