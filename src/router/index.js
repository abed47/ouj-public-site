import Home from '../components/Home.js'
import admin from '../components/admin/index.js'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Routes (){
    return (
    <Router>
      <Route path="/home" component={Home} />
      <Route path="/admin" component={admin} />
    </Router>
    );
}

export default Routes;