// create-seance.dto.ts
import { IsString, IsArray, ArrayMinSize, MinLength, IsNumber, Min, IsNotEmpty } from 'class-validator';

class SetDto {
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

  @IsNumber()
  @Min(1)
  set_reps: number;
}


export class CreateSeanceDto {
    @IsString()
    @MinLength(1)
    name: string;
    
    @IsArray()
    @ArrayMinSize(1)
    sets: SetDto[];
}