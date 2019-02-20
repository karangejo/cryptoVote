import React, { Component} from 'react';
import Layout from '../../components/layout';
import {Segment,Grid} from 'semantic-ui-react';
import moderatedVote from '../../ethereum/moderatedVote';
import { Link } from '../../routes';
import ProposalVote from '../../components/proposalVote';
import ProposalCanVote from '../../components/propCanVoteQuery';

class ShowProp extends Component {

    static async getInitialProps(props) {
      const voteProp = moderatedVote(props.query.proposalAddress);
      const propAddress = props.query.proposalAddress;
      const positiveVotes = await voteProp.methods.positiveVotes().call();
      const negativeVotes = await voteProp.methods.negativeVotes().call();
      const numberOfVoters = await voteProp.methods.numberOfVoters().call();
      const proposalStatement = await voteProp.methods.proposal().call();
      const managerAddress = await voteProp.methods.manager().call();
      const parentUrl = `/orgs/${props.query.address}`;
      const result = await voteProp.methods.result().call();

      return {propAddress,positiveVotes,negativeVotes,numberOfVoters,proposalStatement,managerAddress,parentUrl,result};
    }

    render() {
      return(
        <Layout>
        <Segment raised={true} color="blue">
        <Grid centered={true} padded={true}>
        <Segment circular={true} raised={true} color="orange">
        <h5>
          <Link route= {this.props.parentUrl} >
            <a className="item">Parent Organization</a>
          </Link>
        </h5>
        <h5>Proposal: {this.props.proposalStatement}</h5>
        <h5>Manager: <br/><small>{this.props.managerAddress}</small></h5>
        <h5>Number of Voters: {this.props.numberOfVoters}</h5>
        <h5>Positive Votes: {this.props.positiveVotes}</h5>
        <h5>Negative Votes: {this.props.negativeVotes}</h5>
        <h5>Finalized: {this.props.result}</h5>
        </Segment>
        </Grid>
        <hr/>
        <ProposalVote contractAddress={this.props.propAddress}/>
        <ProposalCanVote contractAddress={this.props.propAddress}/>
        </Segment>
        </Layout>
      );
    }
}

export default ShowProp;
