import {BeDecoratedProps, MinimalProxy, EventConfigs} from 'be-decorated/types';


export interface EndUserProps{
    buttonInsertPosition?: InsertPosition;
    buttonContent?: string;
}

export interface VirtualProps extends EndUserProps, MinimalProxy{
    byob?: boolean,
}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy;
}

export type PP = ProxyProps;

export type PPP = Partial<ProxyProps>;

export type PPE = [Partial<PP>, EventConfigs<Proxy, Actions>];


export interface Actions{
    //batonPass(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps, baton: any): void;
    
    addDeleteBtn(pp: PP): void;
    setBtnContent(pp: PP): void;
    beDeleted(pp: PP): void;
    finale(): void;
}