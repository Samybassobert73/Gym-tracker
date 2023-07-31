import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  muscles: string[];

  @Prop({ required: true })
  userid: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);