import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Set } from './sets.entity';
import { User } from '../../users/entities/user.entity';
export type SeanceDocument = Seance & Document;

@Schema({ timestamps: true })
export class Seance {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }])
    sets: Set[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userid: User;

    @Prop()
    date: Date[];
}


export const SeanceSchema = SchemaFactory.createForClass(Seance);