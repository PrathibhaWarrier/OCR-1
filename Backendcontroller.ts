import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Bind,
  UploadedFiles,
  Request,
  UseGuards,
  ConsoleLogger,
} from '@nestjs/common';

import { SignalService } from './signal.service';
import { CreateSignalDto } from './dto/create-signal.dto';
import { UpdateSignalDto } from './dto/update-signal.dto';
import { createFilterPreferenceDto } from './dto/create-filter-prefernce.dto'
import { ApiTags,ApiConsumes,ApiBody } from '@nestjs/swagger';
import { UpdateCommentsSignalDto } from './dto/update-comments-signal.dto';
import { GetSignal } from './dto/get-signals.dto';
import { FilterQueryDto } from './dto/filter.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CreateSignalEntityDto } from './dto/create-signal-entity.dto';
import { CreateSignalEntityFileDto } from './dto/create-signal-entity-file.dto';
import { updateFilterPreferenceDto } from './dto/update-filter-preference.dto';
import { updateColumnPreferenceDto } from './dto/update-column-preference.dto';

@ApiTags('signal')
@Controller('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  /** Endpoint to create new Signal */
  @Post()
  async create(@Body() createSignalDto: CreateSignalDto) {
    // console.log(createSignalDto);
    return await this.signalService.create(createSignalDto)
  }
    
  /** Endpoint to get the signal with pagination and filter conditions */
  @Post('filter-signals')
  async findSignalsByFilter(@Body() body: GetSignal) {
    return await this.signalService.filterQuery(body);
  }
  
  @Post('page')
  async findSignalsByPage(@Body() body: GetSignal) {
    // console.log(body);
     // this.httpService.get('http://cdcvilms457:9090/niauth/v1/user', {headers:request.headers}).subscribe(result => {
    //   console.log(result)
    // }, err  => {
    //   console.log(err);
    // })
    return await this.signalService.findByPage(body);
  }


  @Post('find-with-text')
  async findSignalsByText(@Body() body: {[key:string]:string}) {
    return await this.signalService.findByText(body);
  }

  // @Get('filter')
  // async filterSignals() {
  //   return await this.signalService.filterQuery();
  // }
  
  /** Endpoint to get all the signals */
  @Get()
  async findAll() {
    try{
      console.log('what is the problem now?')
    return await this.signalService.findAll();
     } catch(error) {
      console.log('show me the error: ', error )
     }
    
  }
  // @Get('tobe-deleted')
  // async findAllWithMax() {
  //   return await this.signalService.findAllWithMax();
  // }
    
  /** Endpoint to get list of only lastest signal within same Signal number along with filter and pagination conditions */
  @Post('all')
  async findAllSignals(@Body() body: GetSignal) {
    try {return await this.signalService.findAllSignals(body);
    } catch(error) {
    console.error('Error in findAll:', error.message);
      throw error;
    }
    
  }

  // @Get('latest-sg')
  // async findLatestSignal() {
  //   return await this.signalService.findLatestSignal();
  // }

  //  @Get('preceding-sg-tree/:id')
  // findPrecedingSGTree(@Param('id') id: string) {
  //   return this.signalService.findPrecedingSGId(id);
  // }


  @Get('sg')
  async findAllSg() {
    return await this.signalService.findSignalsSG();
  }

  //finding filter templates
  @Get('filter-preference/:user_id')
  async findAllFilter(@Param('user_id') user_id: string){
    return await this.signalService.findAllFilter(user_id);
    // return {message: 'this controller is working'}
  }  

  @Get('column-preference/:user_id')
  async findColumnPreference(@Param('user_id') user_id: string){
    return await this.signalService.findColumnPreference(user_id);
  }

  @Put('column-preference')
  async updateColumnPreference(@Body() body : updateColumnPreferenceDto){
    return await this.signalService.updateColumnPreference(body);
  }
  // @Get('default-filter-preference/:user_id')
  // async findDefaultFilter(@Param('user_id') user_id: string){
  //   return await this.signalService.findDefaultFilter(user_id);
  // }

  @Post('filter-preference')
  async createFilterPreference(@Body() body : createFilterPreferenceDto){
    return await this.signalService.createFilterPreference(body)
  }

  @Put('filter-preference')
  async updateFilterPreference(@Body() body : updateFilterPreferenceDto){
    return await this.signalService.updateFilterPreference(body);
  }

  @Delete('filter-prefernce:id')
  async deleteFilterPreference(@Param('id') id: string) {
    return await this.signalService.deleteFilterPreference(id);
  }

  @Put('filter-preference-default')
  async updateDefaultFilter(@Body() body: updateFilterPreferenceDto) {
    return await this.signalService.updateDefaultFilter(body);
  }


  /** This is currently not used */
  // @Post('user-preferences') 
  // async saveFilterPreferences(@Body() createEnity : CreateSignalEntityDto) {
  //   return await this.signalService.saveFilterPreference();
  // }

  /** Endpoint to get the different versions of signal */
  @Get('versions/:id')
  async findVersionsById(@Param('id') id: string) {
    return await this.signalService.findVersionsById(id);
  }
  
  /** Get signalby id */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.signalService.findOne(id);
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSignalDto: UpdateSignalDto) {

    return await this.signalService.update(id, updateSignalDto);
  }

  /** Endpoint to update the status of the signal */
  @Put('update-status/:id')
  async updateStatus(@Param('id') id: string, @Body() in_use: {in_use:boolean}) {
    console.log(in_use);
    return await this.signalService.updateStatus(id, in_use);
  }

  /** Enpoint to update the comments of the signal */
  @Put('update-comments/:id')
  async updateComments(@Param('id') id: string, @Body() updateComments: UpdateCommentsSignalDto) {
    return await this.signalService.updateComments(id, updateComments);
  }
  @Put('update-signal-content/:id')
  async updateSignalContent(@Param('id') id: string, @Body() updateComments: UpdateCommentsSignalDto) {
    return await this.signalService.updateComments(id, updateComments);
  }

  /** Endpoint to add a new Event (entity) to the signal */
  @Post('add-entity') 
  async addSiignalEntity(@Body() createEnity : CreateSignalEntityDto) {
    return await this.signalService.addEntity(createEnity);
  }

  /** Enpoint to update an existing entitiy */
  @Put('update-entity/:id')
  async updateSignalEntity(@Param('id') id: string, @Body() updateComments: UpdateCommentsSignalDto) {
    return await this.signalService.updateEntity(id, updateComments);
  }

  /** Delete the signal by id */
  // @Delete(':id')
  // async remove(@Param('id') id: string, @Body() updateSignal: UpdateSignalDto) {
  //   return await this.signalService.remove(id, updateSignal );
  // }
  @Delete(':id/:deleted_by')
  async remove(@Param('id') id: string, @Param('deleted_by') deleted_by: string) {
    return await this.signalService.remove(id, deleted_by);
  }

  /** Delete entitiy by id */
  @Delete('entity/delete/:id/:deleted_by')
  async removeEntity(@Param('id') id: string, @Param('deleted_by') deleted_by: string) {
    return await this.signalService.removeEntity(id, deleted_by);
  }
  /** Delete entitiyFile by id */
  @Delete('entity/entityFile/delete/:id')
  async removeEntityFile(@Param('id') id: string) {
    return await this.signalService.removeEntityFile(id);
  }

  /** Delete entitiyFile by id */
  @Put('entity/entityFile')
  async updateEntityFile(@Body('entityFile') entityFile: CreateSignalEntityFileDto) {
    return await this.signalService.updateEntityFile(entityFile);
  }

  // @Get('preceding-connection-all/latest')
  // getPrecedingSgConnection(){
  //   return this.signalService.getPrecedingSgConnection();
  // }

  @Get('preceding-and-version-data/latest-new/:signal_id')
  async getPrecedingAndVersionData(@Param('signal_id') signalId: string){
    return await this.signalService.LetNewSgetDataById(signalId);
  }

  @Get('/find-signal-id-with/latest/:sn')
  async getSignalIdWithSn(@Param('sn') SN: string){
    try{
      const result = await this.signalService.getSignalIdWithSn(SN);
      // console.log('done or not', result);
      // console.log(typeof(result));
      return result;
    } catch(error){
      console.error('error: ', error)
    }
  }

}
