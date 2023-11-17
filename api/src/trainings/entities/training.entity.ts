import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TrainingSet } from './trainingSet.entity';
import { User } from '../../users/entities/user.entity';
export type TrainingDocument = Training & Document;

@Schema({ timestamps: true })
export class Training {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Seance', required: true })
    seanceid: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingSet', required: true }])
    TrainingSets: TrainingSet[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userid: User;
    @Prop({ type: Date, default: () => Date.now(), immutable: true })
    createdAt: Date;

    @Prop({ type: Date, default: () => Date.now()  })
    updatedAt: Date;

    
}


export const TrainingSchema = SchemaFactory.createForClass(Training);