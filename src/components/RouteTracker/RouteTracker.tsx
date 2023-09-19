import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';

type Props = {
    history: any
}

const RouteTracker = ({ history }: Props) => {

    history.listen((location: any, action: any) => {
        ReactGA.set({ page: window.location.pathname });
        ReactGA.send({
            hitType: 'pageview',
            page: window.location.pathname
        })
    });

    return <div></div>;
};

export default withRouter(RouteTracker);