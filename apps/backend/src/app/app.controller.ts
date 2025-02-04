import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth') // Barcha auth routlari uchun prefix
export class AppController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;
    // Frontendga redirect qilish
    res.redirect(`http://localhost:4200?token=${user.accessToken}`);
  }

  // app.controller.ts
  @Get('user')
  getUser(@Req() req) {
    return req.user; // Passport avtomatik ravishda user ni sessiyaga qo'yadi
  }
}
