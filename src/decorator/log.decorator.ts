import {configure} from 'log4js'

export function Log<T extends {new(...args:any[]):any}>(constructor:T) {
    console.log('constructor>>>',constructor.name)
    return class extends constructor {
        log = configure()
    }
}