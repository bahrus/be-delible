import {BeDecoratedProps} from 'be-decorated/types';

export interface BeDelibleVirtualProps {
    insertPosition: InsertPosition;
    text: string;
    then: string | any[] | any;
}

export interface BeDelibleProps extends BeDelibleVirtualProps{
    proxy: Element & BeDelibleVirtualProps;
}

export interface BeDelibleActions{
    intro(proxy: Element & BeDelibleVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    finale(proxy: Element & BeDelibleVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onInsertPosition(self: this): void;
    onText(self: this): void;
}