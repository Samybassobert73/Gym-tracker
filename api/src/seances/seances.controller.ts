import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SeancesService } from './seances.service';
import { CreateSeanceDto } from './dto/create-seance.dto';
import { UpdateSeanceDto } from './dto/update-seance.dto';
import { AccessTokenGuard } from 'src/common/guards/accesToken.guard';
import { Request } from 'express';
@Controller('seances')
export class SeancesController {
  constructor(private readonly seancesService: SeancesService) {}
  
  @UseGuards(AccessTokenGuard)
  @Post()
  create(
    @Body() createSeanceDto: CreateSeanceDto,
    @Req() req: Request,
  ) {
    const userid = req.user['sub']; 
    return this.seancesService.create(createSeanceDto,userid );
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  findExercisesByUserId(@Req() req: Request,) {
    return this.seancesService.findAllByUserId(req.user['sub']);
  }

  @Get()
  findAll() {
    return this.seancesService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seancesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeanceDto: UpdateSeanceDto) {
    return this.seancesService.update(+id, updateSeanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seancesService.remove(+id);
  }
}
