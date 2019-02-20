const routes = require('next-routes')();

routes
  .add('/orgs/:address', '/orgs/showOrg')
  .add('/about','/about/about')
  .add('/orgs/:address/proposals/:proposalAddress','/proposals/showProp');

module.exports = routes;
