import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';


export interface EndUserProps{
    insertPosition?: InsertPosition;
    text?: string;
}

export interface VirtualProps extends EndUserProps, MinimalProxy{

}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;


export interface Actions{
    batonPass(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps, baton: any): void;
    finale(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
    onInsertPosition(pp: PP): void;
    onText(pp: PP): void;
}