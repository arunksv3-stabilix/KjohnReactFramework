import React from 'react';
import Column from '../../structure/Column';
import Row from '../../structure/Row';
import { ModalComponentType } from '../../../../logic/context/Modal/ModalContextInterfaces';
import Button, { ButtonTypes } from '../../inputs/Button';

export interface IGenericModalProps {
    Title: string;
    Content?: React.ReactNode;
    Icon?: string;
    Buttons?: IGenericModalButton[];
    Scrollable?: boolean;
    ModalId: string;
}

export interface IGenericModalButton {
    Text: string;
    Method?: () => void | (() => Promise<() => void>);
    CloseAfterMethod?: boolean;
    ButtonType: ButtonTypes;
}

const GenericModal: React.FC<ModalComponentType<IGenericModalProps>> = ({
    Title, 
    Content, 
    Buttons, 
    ModalId,
    Icon, 
    Scrollable,
    close, 
    children
}) => {
    const buttonHandle = (button: IGenericModalButton) => {
        if(!button.Method)
        {
            if(button.CloseAfterMethod)
            {
                close(ModalId);
            }
        }
        else
        {
            Promise.resolve(button.Method())
            .finally(() => {
                if(button.CloseAfterMethod)
                {
                    close(ModalId);
                }
            })
        }
    }

    return (
        <Row className = "Modal_Generic">
            <Column className = "Modal_Generic_Col">
                <Row className="Modal_Header">
                    <Column>
                        {Title}
                    </Column>
                </Row>
                <Row className={"Modal_Content" + (Scrollable ? " Modal_Content_Scroll KRFScroll" : "")}>
                    <Column>
                        {Content ? Content : children}
                    </Column>
                </Row>
                {Buttons && <Row className = "Modal_Footer Modal_Footer_Centered">
                    {
                        Buttons.map((button, index) => 
                        <Column key = {`btn_${index}`}>
                            <Button onClick={() => buttonHandle(button)} buttonType={button.ButtonType}>{button.Text}</Button>
                        </Column>
                        )
                    }
                </Row>}
            </Column>
        </Row>
    )
}

export default GenericModal;