import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly httpService: HttpService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('auth')
  getData(): Observable<any> {
    const url = 'https://app2.gnzs.ru/amocrm/test/oauth/get-token.php';
    const headers = { 'X-Client-Id': '31992158' };

    return this.httpService.get(url,{headers}).pipe(
      map(response => response.data)
    );
  }

  @Post('lead')
  createLead(@Body() body: any, @Headers('authorization') authorization: string): Observable<any> {
    const url = 'https://amocrmgnzstesttask.amocrm.ru/api/v4/leads';
    const headers = { Authorization: authorization };

    return this.httpService.post(url,[{}],{headers}).pipe(
      map(response => response.data)
    );
  }

  @Post('contact')
  createContact(@Body() body: any, @Headers('Authorization') authorization: string): Observable<any> {
    const url = 'https://amocrmgnzstesttask.amocrm.ru/api/v4/contacts';
    const headers = { Authorization: authorization };

    return this.httpService.post(url,[{}],{headers}).pipe(
      map(response => response.data)
    );
  }


  @Post('company')
  createCompany(@Body() body: any, @Headers('Authorization') authorization: string): Observable<any> {
    const url = 'https://amocrmgnzstesttask.amocrm.ru/api/v4/companies';
    const headers = { Authorization: authorization };

    return this.httpService.post(url,[{}],{headers}).pipe(
      map(response => response.data)
    );
  }

  @Post('cube')
  cube(@Body() body: any): number[] {
    const { width, height, depth } = body;

    const hx = width / 2;
    const hy = height / 2;
    const hz = depth / 2;

    const vertices = [
      -hx, -hy, -hz,     hx, hy, -hz,    hx, -hy, -hz, //front triangle
       -hx, -hy, -hz,    -hx, hy, -hz,   hx, hy, -hz,//front triangle
       
      -hx, -hy, hz,      hx, -hy, hz,  hx, hy, hz, //back triangle
      -hx, -hy, hz,      hx, hy, hz,  -hx, hy, hz, //back triangle

      -hx, -hy, -hz,    -hx, -hy, hz,    -hx, hy, -hz, //left triangle
      -hx, -hy, hz,      -hx, hy, hz,  -hx, hy, -hz, //left triangle

      hx, -hy, -hz,      hx, hy, -hz,    hx, -hy, hz, //right triangle
      hx, -hy, hz,      hx, hy, -hz,  hx, hy, hz, //right triangle

      -hx, -hy, -hz,    hx, -hy, -hz,  -hx, -hy, hz, // bottom triangle
      hx, -hy, -hz,    hx, -hy, hz,  -hx, -hy, hz, // bottom triangle

      -hx, hy, -hz,     -hx, hy, hz,    hx, hy, -hz,// top triangle
      -hx, hy, hz,     hx, hy, hz,    hx, hy, -hz,// top triangle
    ];



    return vertices;
  }
}
