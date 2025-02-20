// Type definitions for pino-http 6.0
// Project: https://github.com/pinojs/pino-http#readme
// Definitions by: Christian Rackerseder <https://github.com/screendriver>
//                 Jeremy Forsythe <https://github.com/jdforsythe>
//                 Griffin Yourick <https://github.com/tough-griff>
//                 Jorge Barnaby <https://github.com/yorch>
//                 Jose Ramirez <https://github.com/jarcodallo>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 4.0
/// <reference types="node"/>

import { IncomingMessage, ServerResponse } from 'http';
import pino from 'pino';
import { SerializedError, SerializedRequest, SerializedResponse } from 'pino-std-serializers';

declare function pinoHttp(opts?: Options, stream?: pino.DestinationStream): HttpLogger;

declare function pinoHttp(stream?: pino.DestinationStream): HttpLogger;

interface HttpLogger {
    (req: IncomingMessage, res: ServerResponse, next?: () => void): void;
    logger: pino.Logger;
}
type ReqId = number | string | object;

interface Options extends pino.LoggerOptions {
    logger?: pino.Logger | undefined;
    genReqId?: GenReqId | undefined;
    useLevel?: pino.Level | undefined;
    stream?: pino.DestinationStream | undefined;
    autoLogging?: boolean | AutoLoggingOptions | undefined;
    customLogLevel?: ((res: ServerResponse, error: Error) => pino.Level) | undefined;
    customSuccessMessage?: ((res: ServerResponse) => string) | undefined;
    customErrorMessage?: ((error: Error, res: ServerResponse) => string) | undefined;
    customAttributeKeys?: CustomAttributeKeys | undefined;
    wrapSerializers?: boolean | undefined;
    reqCustomProps?: ((req: IncomingMessage, res: ServerResponse) => object) | undefined;
    quietReqLogger?: boolean | undefined;
}

interface GenReqId {
    (req: IncomingMessage): ReqId;
}

interface AutoLoggingOptions {
    ignore?: ((req: IncomingMessage) => boolean);
    ignorePaths?: Array<string | RegExp> | undefined;
    getPath?: ((req: IncomingMessage) => string | undefined) | undefined;
}

interface CustomAttributeKeys {
    req?: string | undefined;
    res?: string | undefined;
    err?: string | undefined;
    reqId?: string | undefined;
    responseTime?: string | undefined;
}

interface StdSerializers {
    err: SerializedError;
    req: SerializedRequest;
    res: SerializedResponse;
}

export default pinoHttp;

export const startTime: unique symbol;

export const stdSerializers: StdSerializers;