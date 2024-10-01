async updateEntityFile(entityFile:CreateSignalEntityFileDto) {
    console.log("update file "+entityFile.id);
    // const obj = { id: id, ...entityFile };
    return this.signalEntityFilesRepository.save(entityFile);
    console.log(entityFile);
    
  }



import { ApiProperty,ApiPropertyOptional  } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { SignalEntity } from 'db/entities';

export class CreateSignalEntityFileDto {
    @IsNotEmpty()
    @ApiPropertyOptional({type:String, description: 'Id of file'})
    id:string

    // @IsNotEmpty()
    // @ApiPropertyOptional({type:String, description:'Signal Entity'})
    signal_entity_id:string
    SignalEntity:SignalEntity;
    
    // @IsNotEmpty()
    // @ApiPropertyOptional({type:String, description:'original name of file'})
    original_name:string

    @IsNotEmpty()
    @ApiPropertyOptional({type:String, description:'name of file'})
    file_name:string

    // @IsNotEmpty()
    // @ApiPropertyOptional({type:String, description:'file path'})
    file_path:string

    // @IsNotEmpty()
    // @ApiPropertyOptional({type:String, description:'number of file'})
    file_number:string

    @IsNotEmpty()
    @ApiPropertyOptional({type:String, description:'Comments of file'})
    file_comments:string


    // @IsNotEmpty()
    // @ApiPropertyOptional({type:String, description:'name of the owner object'})
    // owner_name:string


}


@Put('entity/entityFile')
  async updateEntityFile(@Body('') entityFile: CreateSignalEntityFileDto) {
    return await this.signalService.updateEntityFile(entityFile);
  }
