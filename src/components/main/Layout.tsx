import React, { useContext } from "react";
import { AppContext } from "../../common/config/appConfig";

interface ILayout {
    MenuComponent: React.ComponentType;
    FooterComponent: React.ComponentType;
    IsCustomMenu: boolean;
    IsCustomFooter: boolean;
}

const Layout: React.FC<ILayout> = ( props ) => {
    const selectedTheme = useContext( AppContext )[ 0 ].globalTheme;
    return (
        <div className={ "PageLayout " + selectedTheme }>
            <div className={ !props.IsCustomMenu ? "PageMenu PageMenuColor" : "" }>
                <props.MenuComponent />
            </div>
            <div className={ "PageContent PageContentColor" } >
                { props.children }
            </div>
            <div className={ !props.IsCustomFooter ? "PageFooter PageMenuColor" : "" }>
                <props.FooterComponent />
            </div>
        </div>
    );
}

export default Layout;