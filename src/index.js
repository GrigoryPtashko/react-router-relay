import React from 'react';

import RelayRouterContext from './RelayRouterContext';
import RouteContainer from './RouteContainer';
import getRouteQueries from './utils/getRouteQueries';

export default {
  renderRouterContext: (child, props) => {
    if (props) {
      Object.keys(props).forEach(prop => {
        if (typeof props[prop] === 'function') {
          props[prop] = props[prop].call(null);
        }
      });
    }

    return (
      <RelayRouterContext {...props}>
        {child}
      </RelayRouterContext>
    );
  },

  renderRouteComponent: (child, props) => {
    /* eslint-disable react/prop-types */
    const { key, route } = props;
    /* eslint-enable react/prop-types */

    const routeQueries = getRouteQueries(route, props);
    const queries = key ? routeQueries && routeQueries[key] : routeQueries;
    if (!queries) {
      return child;
    }

    return (
      <RouteContainer queries={queries} routerProps={props}>
        {child}
      </RouteContainer>
    );
  },
};
