import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param, Query
} from "@nestjs/common";
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/person.model';
import { ProfileDto } from '../dtos/profile.dto';

@Controller('api/v1/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(@Body() profile: ProfileDto): Promise<Profile> {
    return this.profileService.create(profile);
  }

  @Get()
  async findAll(
    @Query('showHidden') showHidden: boolean = false,
  ): Promise<Profile[]> {
    return this.profileService.findAll(showHidden);
  }

  @Get(':id')
  async findOne(@Param('id') id: string,   @Query('showHidden') showHidden: boolean = false,): Promise<Profile> {
    return this.profileService.findOne(id, showHidden);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() profile: ProfileDto,
  ): Promise<Profile> {
    return this.profileService.update(id, profile);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Profile> {
    return this.profileService.softDelete(id);
  }
}
