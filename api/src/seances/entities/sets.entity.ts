// sets.model.ts
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Exercise } from '../../exercises/entities/exercise.entity';
export type SetDocument = Set & Document;

@Schema()
export class Set {
    //repetition d'exercice exemple 4 serie de 4 reps(sets)
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true })
    exe_id: Exercise;

    @Prop({ type: Number, required: true })
    exe_reps: number;

    @Prop({ type: String, required: true })
    rest_time: string;

    @Prop({ type: Number, required: true })
    set_reps: number;

    @Prop({ type: Number, required: true })
    weight: number;

}

export const SetSchema = SchemaFactory.createForClass(Set);