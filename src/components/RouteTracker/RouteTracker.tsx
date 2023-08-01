import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

type Props = {
    history: any
}

const RouteTracker = ({ history }: Props) => {

    history.listen((location: any, action: any) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    });

    return <div></div>;
};

export default withRouter(RouteTracker);