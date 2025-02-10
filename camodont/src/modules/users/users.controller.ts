import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  // ALUMNOOOOOO
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('asignarCampana/:idCampana')
  asignarCampana(@Body()  id: ("id") , @Param('idCampana') idCampana: string) {
    return this.usersService.asignarCamapana(parseInt(id), +idCampana);
  }

  @Get("students")
  findAllStudents() {
    return this.usersService.findAllStudents();
  }

  @Get("users")
  findAllUsers() {
    return this.usersService.findAllUsers();
  }


  @Get(':external_id')
  findOne(@Param('external_id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':external_id')
  update(@Param('external_id') external_id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(external_id, updateUserDto);
  }

  @Delete(':external_id')
  remove(@Param('external_id') id: string) {
    return this.usersService.remove(id);
  }
}
