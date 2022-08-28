import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface BeDelibleVirtualProps extends MinimalProxy{
    insertPosition?: InsertPosition;
    text?: string;
}

export interface BeDelibleProps extends BeDelibleVirtualProps{
    proxy: Element & BeDelibleVirtualProps;
}

export interface BeDelibleActions{
    batonPass(proxy: Element & BeDelibleVirtualProps, target: Element, beDecorProps: BeDecoratedProps, baton: any): void;
    finale(proxy: Element & BeDelibleVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onInsertPosition(self: this): void;
    onText(self: this): void;
}