import { Module } from '@nestjs/common';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Training, TrainingSchema } from './entities/training.entity';
import { TrainingSet, TrainingSetSchema } from './entities/trainingSet.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: Training.name, schema: TrainingSchema },
          { name: TrainingSet.name, schema: TrainingSetSchema }
        ]),
      ],
    controllers: [TrainingsController],
    providers: [TrainingsService],
})
export class TrainingsModule {}
