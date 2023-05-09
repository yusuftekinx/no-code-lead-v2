import { PageTypes } from "./PageTypes";


export interface AppTypes {

    id: string;
    appName:string;
    pageCount: number;
    pages: PageTypes[]

}