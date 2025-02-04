import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TuneService {
  private readonly apiKey = 'sk-tune-oqR7Xa2Q90aqVPn7FU3cZnUuwHGq6ZAFW61';
  private readonly apiUrl = 'https://proxy.tune.app/chat/completions';

  async chatWithModel(messages: any[], stream = true): Promise<any> {
    const data = {
      temperature: 0.8,
      messages,
      model: 'anthropic/claude-3.5-sonnet',
      stream,
      frequency_penalty: 0,
      max_tokens: 8192,
    };

    const headers = {
      Authorization: this.apiKey,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(this.apiUrl, data, {
        headers,
        responseType: 'stream', // Streaming response uchun
      });

      return response.data;
    } catch (error) {
      console.error('Error calling Tune API:', error);
      throw new Error('Failed to get AI response');
    }
  }
}
