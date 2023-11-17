// sets.model.ts
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Exercise } from '../../exercises/entities/exercise.entity';
import { Training } from './training.entity';
export type TrainingSetDocument = TrainingSet & Document;

@Schema()
export class TrainingSet {
    //repetition d'exercice exemple 4 serie de 4 reps(sets)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true })
    exe_id: Exercise;

    @Prop({ type: Number, required: true })
    exe_reps: number;

    @Prop({ type: String, required: true })
    rest_time: string;

    @Prop({ type: Number, required: true })
    weight: number;

    @Prop({ type: Number, required: true })
    set_reps: number;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Training', required: true }])
    Training: Training;

    //resenti de l'exercice difficulté de l'entrainement


}

export const TrainingSetSchema = SchemaFactory.createForClass(TrainingSet);