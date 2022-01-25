import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.todo.findMany();
  }

  async filterTodo(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getOne(todoFind: Prisma.TodoWhereUniqueInput) {
    const data = await this.prisma.todo.findUnique({ where: todoFind });

    if (!data) {
      return { msg: 'not found' };
    }

    return data;
  }

  async create(createTodo: Prisma.TodoCreateInput) {
    return await this.prisma.todo.create({
      data: createTodo,
    });
  }

  async update(
    where: Prisma.TodoWhereUniqueInput,
    data: Prisma.TodoUpdateInput,
  ) {
    const updateData = await this.prisma.todo.update({
      data,
      where,
    });

    if (!updateData) {
      return {
        msg: 'not updated',
      };
    }

    return updateData;
  }

  async delete(idDelete: Prisma.TodoWhereUniqueInput) {
    const deletData = await this.prisma.todo.delete({ where: idDelete });
    return { msg: 'delete successfully', deletData: deletData };
  }
}
