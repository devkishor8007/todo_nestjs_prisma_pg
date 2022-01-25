import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDoto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Nestjs' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example:
      'The OpenAPI specification is a language-agnostic definition format used to describe RESTful APIs.',
  })
  content: string;
}

export class UpdateTodoDto extends PartialType(CreateTodoDoto) {}
