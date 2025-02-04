import { Controller, Post, Body, Res, Header } from '@nestjs/common';
import { Response } from 'express';
import { TuneService } from './tune.service';

@Controller('tune')
export class TuneController {
  constructor(private readonly tuneService: TuneService) {}

  @Post('chat')
  @Header('Content-Type', 'text/event-stream') // Streaming response uchun header
  async chatWithModel(
    @Body('messages') messages: any[],
    @Res() res: Response
  ): Promise<void> {
    const stream = await this.tuneService.chatWithModel(messages, true);

    stream.on('data', (chunk) => {
      const chunkString = chunk.toString().trim();

      // "data: " prefiksini olib tashlash
      if (chunkString.startsWith('data:')) {
        const jsonString = chunkString.replace('data: ', '');

        if (jsonString === '[DONE]') {
          res.end(); // Stream tugadi
          return;
        }

        try {
          const chunkJson = JSON.parse(jsonString);
          const content = chunkJson.choices[0]?.delta?.content || '';
          res.write(`data: ${JSON.stringify({ content })}\n\n`); // SSE formatida javob yuborish
        } catch (error) {
          console.error('Invalid JSON chunk:', jsonString, error);
        }
      } else {
        console.error('Unexpected chunk format:', chunkString);
      }
    });

    stream.on('error', (error) => {
      console.error('Stream error:', error);
      res.status(500).end();
    });
  }
}
