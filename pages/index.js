import React, { Component } from 'react';
import Layout from '../components/layout';
import {Card, Button,Segment} from 'semantic-ui-react';
import orgFactory from '../ethereum/organizationFactory';
import CreateOrg from '../components/createOrganization';
import { Link } from '../routes';


class Index extends Component {
  static async getInitialProps() {
    const organizations = await orgFactory.methods.getOrganizationAddresses().call();
    let names = [];
    for(var i = 0;i<organizations.length;i++){
       var name = await orgFactory.methods.organizationNames(i).call();
       names[i] =name;
     }
     console.log("this");
    return { organizations, names };
  }


  renderOrganizations() {
    const items = this.props.organizations.map( (address,index) => {
      return {
        header: `Organization Name: ${this.props.names[index]}`,
        description: <Link route={`/orgs/${address}`}><a>View Organization</a></Link>,
        meta: `Address: ${address}`,
        fluid: true,
        color: "green",
        raised: true
      };
    });
    return <Card.Group items= {items} />;
  }


  render() {
    return(
      <Layout>
      <Segment raised={true} color="orange">
      <h1>List of Organizations</h1>
        {this.renderOrganizations()}
        </Segment>
        <Segment raised={true} color="red">
        <h3>Create a New Organization</h3>
          <CreateOrg/>
        </Segment>
      </Layout>
    );
  }

}
export default  Index;
