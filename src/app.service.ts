import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.todo.findMany();
  }

  posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  getOne(todoFind: Prisma.TodoWhereUniqueInput) {
    return this.prisma.todo.findUnique({ where: todoFind });
  }

  create(createTodo: Prisma.TodoCreateInput) {
    return this.prisma.todo.create({
      data: createTodo,
    });
  }

  update(where: Prisma.TodoWhereUniqueInput, data: Prisma.TodoUpdateInput) {
    return this.prisma.todo.update({
      data,
      where,
    });
  }

  delete(idDelete: Prisma.TodoWhereUniqueInput) {
    return this.prisma.todo.deleteMany({ where: idDelete });
  }
}
