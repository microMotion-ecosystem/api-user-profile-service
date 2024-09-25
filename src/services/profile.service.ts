import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from '../models/person.model';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private ProfileModel: Model<ProfileDocument>,
  ) {}

  async create(profile: Profile): Promise<Profile> {
    const newProfile = new this.ProfileModel(profile);
    return await newProfile.save();
  }

  async findAll(): Promise<Profile[]> {
    return await this.ProfileModel.find().exec();
  }

  async findOne(id: string): Promise<Profile> {
    return await this.ProfileModel.findOne({ _id: id }).exec();
  }

  async update(id: string, profile: Profile): Promise<Profile> {
    return this.ProfileModel.findByIdAndUpdate(id, profile, { new: true });
  }

  async delete(id: string): Promise<Profile> {
    return this.ProfileModel.findByIdAndDelete(id);
  }
}
