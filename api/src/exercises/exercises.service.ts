import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Model } from 'mongoose';
import { Exercise, ExerciseDocument } from './entities/exercise.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExercisesService {
  constructor(@InjectModel(Exercise.name) private ExerciseModel: Model<ExerciseDocument>) {}

  async create(createExerciseDto: CreateExerciseDto, userId: string): Promise<Exercise> {
    const createdExercise = new this.ExerciseModel({
      ...createExerciseDto,
      userid: userId,
    });

    return createdExercise.save();
  }

  findAll() {
    return `This action returns all exercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }

  async findAllByUserId(userid: string): Promise<Exercise[]> {
    return this.ExerciseModel.find({ userid }).exec();
  }
}
