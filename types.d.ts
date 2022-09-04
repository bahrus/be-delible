import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';


export interface BeDelibleEndUserProps{
    insertPosition?: InsertPosition;
    text?: string;
}

export interface BeDelibleVirtualProps extends BeDelibleEndUserProps, MinimalProxy{

}

export type Proxy = Element & BeDelibleVirtualProps;

export interface ProxyProps extends BeDelibleVirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;


export interface BeDelibleActions{
    batonPass(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps, baton: any): void;
    finale(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
    onInsertPosition(pp: PP): void;
    onText(pp: PP): void;
}