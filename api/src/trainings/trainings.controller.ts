import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { AccessTokenGuard } from 'src/common/guards/accesToken.guard';
import { Request } from 'express';
import { UpdateTrainingDto } from './dto/update-training.dto';
@Controller('trainings')
export class TrainingsController {
    constructor(private readonly trainingsService: TrainingsService) {}
  
    @UseGuards(AccessTokenGuard)
    @Post()
    create(
      @Body() createTrainingDto: CreateTrainingDto,
      @Req() req: Request,
    ) {
        const userid = req.user['sub']; 
        console.log(createTrainingDto);
        return this.trainingsService.create(createTrainingDto, userid );
    }
  
    @UseGuards(AccessTokenGuard)
    @Get('me')
    findTrainingsByUserId(@Req() req: Request,) {
        return this.trainingsService.findAllByUserId(req.user['sub']);
    }

    @Get()
    findAll() {
      return this.trainingsService.findAll();
    }
  
    @UseGuards(AccessTokenGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.trainingsService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto) {
      return this.trainingsService.update(+id, updateTrainingDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.trainingsService.remove(+id);
    }

    @UseGuards(AccessTokenGuard)
    @Get('seances/me')
    findTrainingSeances(@Req() req: Request,) {
        return this.trainingsService.findTrainingSeances(req.user['sub']);
    }

    @UseGuards(AccessTokenGuard)
    @Get('exercises/me')
    findTrainingExercises(@Req() req: Request,) {
        return this.trainingsService.findTrainingExercises(req.user['sub']);
    }
}
