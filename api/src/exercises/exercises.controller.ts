import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AccessTokenGuard } from 'src/common/guards/accesToken.guard';
import { Request } from 'express';
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(
    @Body() createExerciseDto: CreateExerciseDto,
    @Req() req: Request,
  ) {
    const userid = req.user['sub']; 
    return this.exercisesService.create(createExerciseDto, userid);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  findExercisesByUserId(@Req() req: Request,) {
    console.log(req.user['sub'])
    return this.exercisesService.findAllByUserId(req.user['sub']);
  }

  @Get()
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(+id);
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }

  
}
