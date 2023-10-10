import { Injectable } from '@nestjs/common';
import { CreateSeanceDto } from './dto/create-seance.dto';
import { UpdateSeanceDto } from './dto/update-seance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seance, SeanceDocument } from './entities/seance.entity';
import { Set, SetDocument } from './entities/sets.entity';
@Injectable()
export class SeancesService {

  constructor(
    @InjectModel(Seance.name) private seanceModel: Model<SeanceDocument>,
    @InjectModel(Set.name) private setModel: Model<SetDocument>,
  ) {}
  
  async create(createSeanceDto: CreateSeanceDto, userid: string) {
    const setsData = createSeanceDto.sets;
    delete createSeanceDto.sets;

    const createdSeance = await this.seanceModel.create({
      ...createSeanceDto,
      userid 
    });

    const setsPromises = setsData.map(async (setData) => {
      const set = new this.setModel(setData);
      await set.save();
      return set;
    });

    const sets = await Promise.all(setsPromises);
    createdSeance.sets = sets;
    await createdSeance.save();

    return createdSeance;
  }

  findAll() {
    return `This action returns all seances`;
  }

  findOne(id: string) {
    return this.seanceModel.findById(id).populate('sets').exec();
  }

  update(id: number, updateSeanceDto: UpdateSeanceDto) {
    return `This action updates a #${id} seance`;
  }

  remove(id: number) {
    return `This action removes a #${id} seance`;
  }

  findAllByUserId(userid: string): Promise<Seance[]> {
    return this.seanceModel.find({ userid }).exec();
  }
}
