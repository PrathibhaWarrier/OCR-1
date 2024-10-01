import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { SignalEntity } from 'db/entities';

export class CreateSignalEntityFileDto {
    @IsNotEmpty()
    @ApiPropertyOptional({ type: String, description: 'Id of file' })
    id: string;

    @IsOptional()  // Mark optional if it's not mandatory
    @ApiPropertyOptional({ type: String, description: 'Signal Entity ID' })
    signal_entity_id: string;

    @IsOptional()  // Mark optional if not always required
    @ApiPropertyOptional({ type: () => SignalEntity, description: 'Associated Signal Entity' })
    SignalEntity: SignalEntity;

    @IsOptional()  // Optional if not provided always
    @ApiPropertyOptional({ type: String, description: 'Original name of file' })
    original_name: string;

    @IsNotEmpty()  // Required as per your API's behavior
    @ApiPropertyOptional({ type: String, description: 'Name of file' })
    file_name: string;

    @IsOptional()  // Optional, not always needed
    @ApiPropertyOptional({ type: String, description: 'Path of file' })
    file_path: string;

    @IsOptional()  // Optional, can be omitted
    @ApiPropertyOptional({ type: String, description: 'Number of file' })
    file_number: string;

    @IsNotEmpty()  // Required as per your API's behavior
    @ApiPropertyOptional({ type: String, description: 'Comments of file' })
    file_comments: string;
}










async updateEntityFile(entityFile: CreateSignalEntityFileDto): Promise<SignalEntityFiles> {
  try {
    console.log("Updating or inserting file with ID:", entityFile.id);
    
    // Ensure missing optional fields are handled properly, e.g. by setting defaults or ignoring them.
    const updatedFile = await this.signalEntityFilesRepository.save({
      ...entityFile,
      original_name: entityFile.original_name ?? '',  // Provide default if null
      file_path: entityFile.file_path ?? '',
      file_number: entityFile.file_number ?? ''
    });
    
    console.log('Entity file after update:', updatedFile);
    return updatedFile;
  } catch (error) {
    console.error('Error while updating entity file:', error);
    throw error;
  }
}
