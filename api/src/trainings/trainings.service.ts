import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Training, TrainingDocument } from './entities/training.entity';
import { Model } from 'mongoose';
import { TrainingSet, TrainingSetDocument } from './entities/trainingSet.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Injectable()
export class TrainingsService {
    constructor(
        @InjectModel(Training.name) private trainingModel: Model<TrainingDocument>,
        @InjectModel(TrainingSet.name) private trainingSetModel: Model<TrainingSetDocument>,
      ) {}
      
      async create(createTrainingDto: CreateTrainingDto, userid: string): Promise<any>  {
        const trainingSetsData = createTrainingDto.trainingSets;
        delete createTrainingDto.trainingSets;
        
        
        const training = new this.trainingModel({
            seanceid: createTrainingDto.seanceid,
            userid: userid,
        });

        const trainingSetsPromises = trainingSetsData.map( async (trainingSetData) => {
            const trainingSet = new this.trainingSetModel(trainingSetData)
            await trainingSet.save();
            return trainingSet  
        })

        
        const trainingSets = await Promise.all(trainingSetsPromises);
        training.TrainingSets = trainingSets;
        await training.save();

        return training;

      }
    
      findAll() {
        return 'This action returns all trainings'
      }
    
      findOne(id: string) {
        return this.trainingModel.findById(id).populate('TrainingSet').exec();
      }
    
      update(id: number, updateTrainingDto: UpdateTrainingDto) {
        return `This action updates a #${id} seance`;
      }
    
      remove(id: number) {
        return `This action removes a #${id} seance`;
      }

      async findAllByUserId(userid: string): Promise<any> {
        
        const data = await this.trainingModel.aggregate(
          [
            {
              $lookup: {
                from: 'seances', 
                localField: 'seanceid', 
                foreignField: '_id', 
                as: 'seance'
              }
            }, {
              $unwind: '$seance'
            }, {
              $lookup: {
                from: 'trainingsets', 
                localField: 'TrainingSets', 
                foreignField: '_id', 
                as: 'trainingsets'
              }
            }, {
              $unwind: '$trainingsets'
            }, {
              $lookup: {
                from: 'exercises', 
                localField: 'trainingsets.exe_id', 
                foreignField: '_id', 
                as: 'exercises'
              }
            }, {
              $unwind: '$exercises'
            }, {
              $project: {
                _id: 1, 
                seance: {
                  _id: 1, 
                  name: 1
                }, 
                trainingsets: {
                  exe_id: 1, 
                  exe_reps: 1, 
                  weight: 1, 
                  set_reps: 1
                }, 
                createdAt:  {
                  $dateToString: {
                    format: "%Y-%m-%d",  // Format for dd/mm/yyyy
                    date: "$createdAt"   // Field to format
                  }
                },
                exercises: {
                  _id: 1, 
                  name: 1
                }
              }
            }
          ]
          )  
        
        return data;
      }
    async findTrainingSeances (userid: string): Promise<any> {
      const data = await this.trainingModel.aggregate([
        {
          $lookup: {
            from: "seances",
            localField: "seanceid",
            foreignField: "_id",
            as: "seance"
          }
        },
        {
          $unwind: "$seance"
        },
        {
          $group: {
              _id: "$seance._id",  // Group by seance_id
              name: { $first: "$seance.name" }  // Include other fields you need from 'seance'
          }
        },
        {
          $project: {
              _id: 0,  // Exclude _id from the final result
              id: "$_id",  // Rename _id to seance_id if needed
              name: 1  // Include other fields you need
          }
        }
      ])  
      
      return data;
    }
       
    async findTrainingExercises (userid: string): Promise<any> {
      const data = await this.trainingModel.aggregate([
        {
          $lookup: {
            from: "trainingsets",
            localField: "TrainingSets",
            foreignField: "_id",
            as: "trainingsets",
          }
        },
        {
          $unwind: "$trainingsets"
        },
        {
          $lookup: {
            'from': 'exercises', 
            'localField': 'trainingsets.exe_id', 
            'foreignField': '_id', 
            'as': 'exercices'
          }
        }, {
          $unwind: '$exercices'
        },
        {
          $group: {
              _id: '$exercices._id',  // Group by exe_id
              name: { $first: '$exercices.name' }  // Include other fields you need from 'exercices'
          }
      },
      {
          $project: {
              _id: 0,  // Exclude _id from the final result
              id: '$_id',  // Rename _id to exe_id if needed
              name: 1  // Include other fields you need
          }
      }
      ])  
      
      return data;
    }
}
