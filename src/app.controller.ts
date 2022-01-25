import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTodoDoto, UpdateTodoDto } from './Dto/createDto';

@ApiTags('todo')
@Controller('todo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get All ToDo',
  })
  async getTodo() {
    return await this.appService.getAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Get The Action By Id' })
  async getTodoById(@Param('id') id: string) {
    return await this.appService.getOne({ id: +id });
  }

  @Get('filtered-todo/:searchString')
  async getFilteredPosts(@Param('searchString') searchString: string) {
    return await this.appService.filterTodo({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post()
  @ApiBody({ type: CreateTodoDoto })
  @ApiCreatedResponse({ description: 'Add Todo' })
  async createTodo(@Body() createTodo: CreateTodoDoto) {
    return await this.appService.create(createTodo);
  }

  @Patch(':id')
  async updateTodo(@Param('id') id: string, @Body() updateTodo: UpdateTodoDto) {
    return await this.appService.update({ id: Number(id) }, updateTodo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return await this.appService.delete({ id: +id });
  }
}
