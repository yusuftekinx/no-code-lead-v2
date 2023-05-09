
import {uid} from 'uid'

export const generateRandomUID = (): string => {
    return uid(15);
}