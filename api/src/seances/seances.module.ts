import { Module } from '@nestjs/common';
import { SeancesService } from './seances.service';
import { SeancesController } from './seances.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Seance, SeanceSchema } from './entities/seance.entity'; // Import the Seance model and schema
import { Set, SetSchema } from './entities/sets.entity'; // Import the Set model and schema
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Seance.name, schema: SeanceSchema },
      { name: Set.name, schema: SetSchema }
    ]),
  ],
  controllers: [SeancesController],
  providers: [SeancesService]
})
export class SeancesModule {}
