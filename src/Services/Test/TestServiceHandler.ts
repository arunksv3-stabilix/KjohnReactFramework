import { useFetchGetHandler } from "../../common/services/fetchHandler";
import { ServiceType } from "../../common/services/serviceCallerInterfaces";
import { ContextActions, AppLanguage } from "../../common/context/appContextEnums";
import { ITestServiceResponse, ITestServiceRequest } from "./TestServiceInterfaces";
import { delayedPromise } from "../../common/functions/misc";
import { TestServiceRequestType } from "./TestServiceEnum";

export const useTestServiceHandler: () => ServiceType<ITestServiceRequest, ITestServiceResponse> = () => {
    const { Get } = useFetchGetHandler<ITestServiceResponse>("InexistentService404");

    const getData: ServiceType<ITestServiceRequest, ITestServiceResponse> = async ( { context, serviceRequest } ) => {
        if (serviceRequest)
        {
            if ( serviceRequest.Type === TestServiceRequestType.GetSample_3 ) {
                return delayedPromise( 1500 ).then(() => Get());
            }
            
            if( serviceRequest.Type === TestServiceRequestType.GetSample_1 )
            {
                context.appContext.Set( {
                    type: ContextActions.ChangeLanguage,
                    payload: {
                        globalLanguage: AppLanguage.EN
                    }
                } );
            }

            return delayedPromise( 2000 )
                .then( () => {
                    return {
                        Success: "True",
                        LanguageCode: context.appLanguage
                    }
                } );
        }
        return {}
    }
    return getData;
}