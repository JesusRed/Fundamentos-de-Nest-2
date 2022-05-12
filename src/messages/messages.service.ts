import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-messages-dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async getAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async createMessage(newMessage: CreateMessageDto): Promise<Message> {
    const nuevo = new Message();
    nuevo.text = newMessage.text;
    nuevo.nick = newMessage.nick;

    return this.messageRepository.save(nuevo);
  }

  async updateMessage(
    idMessage: number,
    updtMessage: CreateMessageDto,
  ): Promise<Message> {
    const messageUpdate = await this.messageRepository.findOne(idMessage);
    messageUpdate.nick = updtMessage.nick;
    messageUpdate.text = updtMessage.text;

    return await this.messageRepository.save(messageUpdate);
  }

  async deleteMessage(idMessage: number): Promise<any> {
    return await this.messageRepository.delete(idMessage);
  }
}
