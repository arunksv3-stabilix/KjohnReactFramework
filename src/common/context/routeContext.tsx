import { useState } from "react";
import { IRouteContext, RouteContextType, IRouteAction } from "./routeContextInterfaces";
import { RouteActions } from "./routeContextEnums";

export const useRouteContext: ( initialRoute: IRouteContext ) => RouteContextType = ( initialRoute ) => {
    const [ routeContext, setRouteContext ] = useState( initialRoute );

    const changeRoute = ( action: IRouteAction ) =>  {
        switch ( action.type ) {
            case RouteActions.ChangePage: {
                if ( action.payload.selectedPage !== undefined )
                    setRouteContext( {
                        ...routeContext,
                        selectedPage: action.payload.selectedPage,
                        queryString: action.payload.queryString,
                        forceReload: action.payload.forceReload,
                        routeParams: undefined
                    } );
                break;
            }
            case RouteActions.UpdateRouteParams: {
                setRouteContext({
                    ...routeContext,
                    routeParams: action.payload.routeParams
                })
                break;
            }
            case RouteActions.ForceReloadDisable: {
                setRouteContext({
                    ...routeContext,
                    forceReload: false,
                    routeParams: action.payload.routeParams
                })
                break;
            }
        }
    }
    
    return [ routeContext, changeRoute ];
}