import { faker } from '@faker-js/faker';
import { ConversationController } from '../../controllers/conversation';
import { MongoServiceMock } from '../mocks/mongoService';
import { UltimateAIServiceMock } from '../mocks/ultimate.ai';

describe('conversation controller', () => {
  let conversationController: ConversationController;
  let mongoServiceMock: MongoServiceMock;
  let ultimateAIServiceMock: UltimateAIServiceMock;

  beforeEach(() => {
    mongoServiceMock = new MongoServiceMock();
    ultimateAIServiceMock = new UltimateAIServiceMock();

    conversationController = new ConversationController(
      mongoServiceMock,
      ultimateAIServiceMock
    );
  });

  it('responds with  default confidence threshold', async () => {
    const visitorMessage = {
      bot_id: faker.datatype.hexadecimal(),
      visitor_message: faker.datatype.string()
    };

    jest.spyOn(ultimateAIServiceMock, 'getIntents');

    const answer = await conversationController.getReply(visitorMessage);

    expect(answer).toHaveProperty('text');
    expect(ultimateAIServiceMock.getIntents).toHaveBeenCalledTimes(1);
  });

  // it('responds with  custom confidence threshold', async () => {
  //   conversationController.getReply();
  // });
});
