import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ILog, Profile, ProfileDocument } from '../models/person.model';
import { Model } from 'mongoose';
import { ProfileDto } from '../dtos/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private ProfileModel: Model<ProfileDocument>,
  ) {}

  async create(profile: ProfileDto): Promise<Profile> {
    const newProfile = new this.ProfileModel(profile);
    newProfile.log = [
      {
        message: 'Profile created',
        date: new Date(),
        by: '12345678978978',
      },
    ];
    return await newProfile.save();
  }

  async findAll(showHidden = false): Promise<Profile[]> {
    if (!showHidden) {
      return await this.ProfileModel.find()
        .where('isDeleted')
        .ne(null)
        .exec();
    } else {
      return await this.ProfileModel.find().select('-log ').exec();
    }
  }

  async findOne(id: string, showHidden = false): Promise<Profile> {
    if (!showHidden) {
      return await this.ProfileModel.findById(id)
        .where('isDeleted')
        .ne(true)
        .exec();
    } else {
      return await this.ProfileModel.findById(id).exec();
    }
  }

  async update(id: string, profile: ProfileDto): Promise<Profile> {
    const logEntry: ILog = {
      message: 'Profile updated',
      data: { new: profile },
      date: new Date(),
      by: '12345678978978',
    };
    return this.ProfileModel.findByIdAndUpdate(
      id,
      {
        $set: profile,
        $push: { log: logEntry },
      },
      { new: true },
    ).exec();
  }

  async softDelete(id: string): Promise<Profile> {
    return this.ProfileModel.findByIdAndUpdate(
      id,
      { isDeleted: new Date() },
      { new: true },
    );
  }

  async delete(id: string): Promise<Profile> {
    return this.ProfileModel.findByIdAndDelete(id);
  }
}
