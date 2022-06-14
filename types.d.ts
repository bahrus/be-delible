import {BeDecoratedProps} from 'be-decorated/types';

export interface BeDelibleVirtualProps {
    insertPosition: InsertPosition;
}

export interface BeDelibleProps extends BeDelibleVirtualProps{
    proxy: Element & BeDelibleVirtualProps;
}

export interface BeDelibleActions{
    intro(proxy: Element & BeDelibleVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    finale(proxy: Element & BeDelibleVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
}