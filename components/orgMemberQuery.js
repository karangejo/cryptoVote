import React, { Component } from 'react';
import proposalFactory from '../ethereum/voteFactory';
import { Form, Button, Message,Segment } from 'semantic-ui-react';
import web3 from '../ethereum/web3';



class OrgMember extends Component {

  state = {
    errorMessage: '',
    memberStatus: '',
    loading: false,
    showMemberStatus: false
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const propFac = proposalFactory(this.props.contractAddress);
    this.setState({loading:true,errorMessage: '',showMemberStatus: false});
    try{
      const accounts = await web3.eth.getAccounts();
      const member = await propFac.methods
        .registered(accounts[0]).call();
        //.send({
        //  from: accounts[0]
        //});

        var status = '';

        if(member){
          status = 'You are currently registered as a member of this Organization.';
        } else {
          status = 'You are currently not registered as a member of this Organization.';
        }

      this.setState({memberStatus: status ,showMemberStatus: true})
    } catch (err) {
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:false});
  };

  renderMessage(){
    return(
      <Message content={this.state.memberStatus}/>
    );
  }


  render() {
    return (
      <Segment raised={true} color="pink" text-align="center">
      <h3>Am I a Member?</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
      {this.state.showMemberStatus && this.renderMessage()}
      <Message error header="Oops!" content={this.state.errorMessage}/>
      <Button loading={this.state.loading} primary>Check</Button>
    </Form>
      </Segment>
    );
  }

}

export default OrgMember;
