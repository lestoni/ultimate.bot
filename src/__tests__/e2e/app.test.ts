import request from 'supertest';

import app from '../../app';

describe('Ultimate.bot:api', () => {
  describe('Reply Endpoint', () => {
    // TODO: Remove after fixing net issue
    it.skip('POST /reply - returns known text reply', async () => {
      const response = await request(app).post('/reply').send({
        bot_id: '5f74865056d7bb000fcd39ff',
        visitor_message: 'hi'
      });

      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toEqual(200);

      const botReply = response.body;
      expect(botReply).toHaveProperty('text');
      expect(botReply.text).toBe('Hello :) How can I help you?');
    });

    it('POST /reply - returns default text reply', async () => {
      const response = await request(app).post('/reply').send({
        bot_id: '5f74865056d7bb000fcd39ff',
        visitor_message: 'My donut went to mars in sandwich time'
      });

      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toEqual(200);

      const botReply = response.body;
      expect(botReply).toHaveProperty('text');
      expect(botReply.text).toBe('Sorry, I am not able to answer that at the moment! Try another question');
    });

    it('POST /reply - returns validation error', async () => {
      const response = await request(app).post('/reply').send({
        bot_id: '5f74865056d7bb000fcd39ff'
      });

      console.log(response.body)

      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toEqual(400);

      const botReply = response.body;
      expect(botReply).toHaveProperty('error');
      expect(botReply.error).toContain('data validation failed');
    });
  });
});
