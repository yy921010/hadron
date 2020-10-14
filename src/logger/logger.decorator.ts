import { configure, Logger } from "log4js";

const logger = {}

export function Log <T extends { new (...args:any[]):any}>(constructor:T){
    return class extends constructor {
        log :Logger ={}
    }
}