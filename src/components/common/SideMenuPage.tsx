import React, { useState, useEffect } from 'react';
import Column, { ColumnNumber } from './Column';
import Row from './Row';
import useWindowSize from '../../common/functions/windowResize';

interface ISideMenuProps {
    title: string;
    presentationComponent: string | React.ComponentType | JSX.Element | JSX.IntrinsicElements;
    menus: IMenu[];
}

interface IMenu {
    title: string;
    startCollapsed?:boolean;
    submenus: ISubMenu[];
}

interface ISubMenu {
    title: string;
    component: string | React.ComponentType | JSX.Element | JSX.IntrinsicElements;
}

interface ISideMenuItem {
    selectFunc: ( component: string | React.ComponentType | JSX.Element | JSX.IntrinsicElements, index: string ) => void;
    index: number;
    menu: IMenu;
    selectedIndex: string;    
}

const SideMenuItem: React.FC<ISideMenuItem > = ( props ) => {
    const [collapse, setCollapse] = useState<boolean>( props.menu.startCollapsed !== undefined && props.menu.startCollapsed );
    return (
    <Row>
        <Column>
            <span className = "SideMenuMenu pointer_cursor" onClick = { () => { setCollapse( !collapse ) } }>{( collapse ? "+ " : "- " ) + props.menu.title }</span>
            <div className = { collapse ? "SideMenuHidden" : "" } >
                {
                    props.menu.submenus.map( ( subMenu, z ) =>
                    {
                        let index = "menu-" + props.index + "subMenu-" + z;
                        return(
                        <Row key = { "menu-" + props.index + "subMenu-" + z }>
                            <Column className = "SubMenuSubMenu">
                                <span 
                                    className = { props.selectedIndex === index? "SideMenuSelectedSubMenu" : "pointer_cursor" }
                                    onClick = { () => { props.selectFunc( subMenu.component, index ) } }
                                >
                                    {subMenu.title}
                                </span>
                            </Column>
                        </Row>)
                    })
                }
            </div>
        </Column>
    </Row>)
}

const SideMenuPage: React.FC<ISideMenuProps> = ( props ) => {
    const [ width ] = useWindowSize();
    const [ selected, setSelected ] = useState<string | React.ComponentType | JSX.Element | JSX.IntrinsicElements>( props.presentationComponent );
    const [ selectedIndex, setSelectedIndex ] = useState<string>( "" );
    const [ menuCollapse, setMenuCollapse ] = useState<boolean>( false );
    const selectSubMenu: ( component: string | React.ComponentType | JSX.Element | JSX.IntrinsicElements, index: string ) => void = ( component, index ) => {
        setSelected( component );
        setSelectedIndex(index);
    }

    useEffect( () => {
        if( width <= 480 )
            setMenuCollapse( true );
        else
            setMenuCollapse( false );
    }, [width] );

    return (
        <Row className = "SideMenuPage">
            <Column full = { ColumnNumber.C3} className = "SideMenuColumn" mobile = { ColumnNumber.C20 }>
                <Row>
                    <Column className = { "SideMenuColumnContent" + ( menuCollapse ? " SideMenuColumnContentHidden" : "" ) }>
                        <Row>
                            <Column className = "SideMenuTitle">
                                <Row>
                                    <Column className = "SideMenuTitleText" >
                                        <span className = "pointer_cursor" onClick = { () => { selectSubMenu( props.presentationComponent, "") } }>{props.title}</span>
                                    </Column>
                                    <Column full = { ColumnNumber.C2 } className = "SideMenuTitleCollapse">
                                        { width <= 480 && <span className = "pointer_cursor " onClick = { () => { setMenuCollapse( !menuCollapse ) } }>{ menuCollapse ? "+" : "-" }</span> }
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                        <Row>
                            <Column className = {"SideMenuContent" + ( menuCollapse ? " SideMenuHidden" : "") }>
                                {
                                    props.menus.map( (menu, i) => 
                                        <SideMenuItem  
                                            key = {i}
                                            index = {i}
                                            menu = { menu }
                                            selectFunc = { selectSubMenu }
                                            selectedIndex = { selectedIndex }
                                        />
                                )}
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Column>
            <Column className = "SideMenuComponentColumn">
                <Row className = "SideMenuComponentRow">
                    <Column>
                        {selected}
                    </Column>
                </Row>
            </Column>
        </Row>
    );
}

export default SideMenuPage;