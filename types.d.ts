import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    buttonInsertPosition?: InsertPosition;
    buttonContent?: string;
}

export interface AllProps extends EndUserProps{
    byob?: boolean,
}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>]

export type ProPOA = Promise<POA>;

export interface Actions{
    //batonPass(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps, baton: any): void;
    
    addDeleteBtn(self: this): ProPOA ;
    setBtnContent(self: this): void;
    beDeleted(self: this): void;
    //finale(): void;
}