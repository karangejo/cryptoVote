import Head from 'next/head';
import { Container,Segment, Grid, Menu } from 'semantic-ui-react';
import { Link } from '../routes';


const Layout = (props) => (
  <div>
    <Head>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"/>
    </Head>
    <hr/>
    <Grid padded={true} centered={true}>
      <Segment circular={true} raised={true} text-align="center" color="purple">
        <h1>CryptoVote </h1>
        <Menu secondary>
          <Menu.Item>
          <Link route="/">
            <a className="item">Home</a>
          </Link>
          </Menu.Item>
          <Menu.Item>

          <Link route="/about">
            <a className="item">About</a>
          </Link>
          </Menu.Item>
          </Menu>
        </Segment>
    </Grid>
        {props.children}
    </div>
  );



export default Layout;
