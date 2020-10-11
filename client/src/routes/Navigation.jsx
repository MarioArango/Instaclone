import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import { map } from 'lodash';

/*creo que component={route.component} es muy prolijo a compracion del de abajo
render = {(props) => <route.component {...props} />} porque al de abajo le podemos pasar un prop de autehnticacion para validar el ingreso, ya que como puse en routes.js, es un sistema de rutas para usuarios logeados

*/
export default function Navigation(){
    return (
        <Router>
            <Switch>
                { map(routes, (route, index) => (
                    <Route  
                        key={index}
                        exact={route.exact}
                        path={route.path}
                        render={(props) => (
                            <route.layout>
                                <route.component {...props} />
                            </route.layout>
                        )}
                    />
                ))}
            </Switch>
        </Router>
    );
};  


