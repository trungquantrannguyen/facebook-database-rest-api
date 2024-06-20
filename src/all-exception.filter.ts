import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggerService } from './logger/logger.service';
import * as request from 'supertest';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object | any;
};

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new LoggerService(AllExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    const myResponseObj: MyResponseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.response = exception.getResponse();
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObj.response = 'Internal Server Error';
    }

    response.status(myResponseObj.statusCode).json(myResponseObj);
    this.logger.error(myResponseObj.response, AllExceptionFilter.name);

    super.catch(exception, host);
  }
}
