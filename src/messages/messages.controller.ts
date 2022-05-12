import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-messages-dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesServices: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Res() response) {
    this.messagesServices
      .createMessage(createMessageDto)
      .then((mensaje) => {
        response.status(HttpStatus.CREATED).json(mensaje);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'ERROR NO CREATION MESSAGE' });
      });
  }

  @Get()
  getAll(@Res() response) {
    this.messagesServices
      .getAll()
      .then((messagesList) => {
        response.status(HttpStatus.OK).json(messagesList);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'ERROR NO LIST MESSAGE' });
      });
  }

  @Put(':id')
  update(
    @Body() updateMessageDto: CreateMessageDto,
    @Res() response,
    @Param('id') idMessage,
  ) {
    this.messagesServices
      .updateMessage(idMessage, updateMessageDto)
      .then((message) => {
        response.status(HttpStatus.OK).json(message);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'ERROR NO UPDATE MESSAGE' });
      });
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') idMessage) {
    this.messagesServices
      .deleteMessage(idMessage)
      .then((res) => {
        response.status(HttpStatus.OK).json(res);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'ERROR NO DELETE MESSAGE' });
      });
  }
}
