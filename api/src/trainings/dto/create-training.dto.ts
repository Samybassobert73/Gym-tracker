// create-seance.dto.ts
import { IsString, IsArray, ArrayMinSize, MinLength, IsNumber, Min, IsNotEmpty } from 'class-validator';

class TrainingSetDto {
  @IsString()
  @MinLength(1)
  exe_id: string;

  @IsNumber()
  @Min(1)
  exe_reps: number;

  @IsNumber()
  @Min(1)
  weight: number;

  @IsNotEmpty()
  rest_time: string;

}


export class CreateTrainingDto {
    @IsArray()
    @ArrayMinSize(1)
    trainingSets: TrainingSetDto[];

    seanceid: string;
}