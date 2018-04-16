import { withRouter } from 'react-router'

const WithRouter = withRouter(({children, ...props}) => (children(props)));

export default WithRouter;