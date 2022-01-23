import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppService } from './app.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('todo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get All ToDo',
  })
  getTodo() {
    return this.appService.getAll();
  }

  @Get(':id')
  getTodoById(@Param('id') id: string) {
    return this.appService.getOne({ id: +id });
  }

  @Get('filtered-todo/:searchString')
  getFilteredPosts(@Param('searchString') searchString: string) {
    return this.appService.posts({
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
  @ApiCreatedResponse({ description: 'Add Todo' })
  createTodo(@Body() createTodo: Prisma.TodoCreateInput) {
    return this.appService.create(createTodo);
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() updateTodo: Prisma.TodoUpdateInput,
  ) {
    return this.appService.update({ id: +id }, updateTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.appService.delete({ id: +id });
  }
}
