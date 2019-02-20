import React, { Component} from 'react';
import Layout from '../../components/layout';
import voteFactory from '../../ethereum/voteFactory';
import  CreateProposal from '../../components/createProposal';
import AddVoters from '../../components/addVoters';
import OrgMember from '../../components/orgMemberQuery';

import {Card,Segment,Grid} from 'semantic-ui-react';
import { Link } from '../../routes';


class ShowOrg extends Component {

  static async getInitialProps(props) {
    const voteFac = voteFactory(props.query.address);
    const orgAddress = props.query.address;
    const orgName = await voteFac.methods.organizationName().call();
    const proposalAddresses = await voteFac.methods.getProposalAddresses().call();
    const manager = await voteFac.methods.manager().call();
    const numVoters = await voteFac.methods.numberOfVoters().call();

    var proposalStatements = [];
    for(var i=0;i<proposalAddresses.length;i++){
      var statement = await voteFac.methods.proposalStatements(i).call();
      proposalStatements[i]=statement;
    }
    return {orgName,proposalAddresses,proposalStatements,orgAddress,manager,numVoters};
  }

  renderProposals() {
    const items = this.props.proposalAddresses.map( (address,index) => {
      return {
        header: `Proposal: ${this.props.proposalStatements[index]}`,
        description: <Link route={`/orgs/${this.props.orgAddress}/proposals/${address}/`}><a>View Proposal</a></Link>,
        meta: `Address: ${address}`,
        fluid: true,
        color: "yellow",
        raised: true
      };
    });
    return <Card.Group items= {items} />;
  }


  render(){
    return(
      <Layout>
      <Segment raised={true} color="blue">
      <Grid centered={true} padded={true}>
      <Segment circular={true} raised={true} color="orange">
      <h5>Organization Name: {this.props.orgName}</h5>
      <h5>Manager: <br/><small>{this.props.manager}</small></h5>
      <h5>Number of Voters: {this.props.numVoters}</h5>
      </Segment>
      </Grid>
      <hr/>
      <h3>Proposal List</h3>
      {this.renderProposals()}
      </Segment>
      <CreateProposal contractAddress = {this.props.orgAddress}/>
      <AddVoters contractAddress = {this.props.orgAddress}/>
      <OrgMember contractAddress = {this.props.orgAddress}/>
      </Layout>
    );
  }
}

export default ShowOrg;
