import React, { Component } from 'react';
import Layout from '../../components/layout';
import {Card, Grid, Segment} from 'semantic-ui-react';

class About extends Component {
  static getInitialProps(){
    const text = ["This is an Application for creating Organizations and providing voting and decision making services."
          + " It is deployed on Rinkeyby test network."
          + " Anyone can create a new Organization with their Ethereum Account connected to the Rinkeby test network."
          + " the person who creates an Organization is the manager of that Organization."
          + " Only he or she can add other members to the Organization."
          + " Once all the members have been added then any member can create a Proposal to be voted on."
          + " The creator of the Proposal is the manager of the Proposal."
          + " Once the majority of voters have reached a decision the manager can Finalize the issue."
          + " Once the Proposal has been finalized no further voting is conducted and the Proposal is closed."
          + " Users can check if they are able to vote on a Proposal or if they are members of an Organization."]
    return{text};
  }


  render(){
    return(
      <Layout>
      <Grid  padded={true} centered={true}>
      <Segment raised={true} text-align="center" color="red">
      <h1>How to Use this App</h1>
      <Card>
         <Card.Content>
           <Card.Description>{this.props.text}</Card.Description>
         </Card.Content>
     </Card>
      </Segment>
      </Grid>
      </Layout>
    );
  }
}

export default About;
