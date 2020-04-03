import React from 'react';
import { AppProvider } from '../../common/config/appConfig';
import PageHandler, { IPageHandleProps } from './PageHandler';
import Layout from './Layout';
import SessionHandler from './SessionHandler';
import { injectProps } from '../../common/functions/misc';
import Footer from './Footer';
import Menu, { IMenuProps } from './Menu';

export interface IKRFProps {
  Routes: IPageHandleProps<any>;
  CustomMenuComponent?: React.ComponentType;
  CustomFooterComponent?: React.ComponentType;
  MenuProps?: IMenuProps;
  FooterProps?: any;
}

const KRFApp: React.FC<IKRFProps> = (props) =>
  <AppProvider>
    <SessionHandler>
      <Layout 
        MenuComponent={ props.CustomMenuComponent ? props.CustomMenuComponent : injectProps(Menu, props.MenuProps) } 
        FooterComponent={ props.CustomFooterComponent ? props.CustomFooterComponent : injectProps(Footer, props.FooterProps) } 
        IsCustomMenu={ props.CustomMenuComponent !== undefined }
        IsCustomFooter={ props.CustomFooterComponent !== undefined }
      >
        <PageHandler
          {...props.Routes}
        />
      </Layout>
    </SessionHandler>
  </AppProvider>


export default KRFApp;