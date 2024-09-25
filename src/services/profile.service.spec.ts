import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { getModelToken } from '@nestjs/mongoose';
import { Profile } from '../models/person.model';
import { Model } from 'mongoose';

const mockProfile = {
  name: 'Test Name',
  age: 30,
  email: 'test@example.com',
};

const mockProfileModel = {
  new: jest.fn().mockResolvedValue(mockProfile),
  constructor: jest.fn().mockResolvedValue(mockProfile),
  find: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
  exec: jest.fn(),
};

describe('ProfileService', () => {
  let service: ProfileService;
  let model: Model<Profile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getModelToken(Profile.name),
          useValue: mockProfileModel,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    model = module.get<Model<Profile>>(getModelToken(Profile.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new profile', async () => {
    jest.spyOn(model, 'save').mockResolvedValueOnce(mockProfile as any);
    const newProfile = await service.create(mockProfile as any);
    expect(newProfile).toEqual(mockProfile);
  });

  it('should return all profiles', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([mockProfile]),
    } as any);
    const profiles = await service.findAll();
    expect(profiles).toEqual([mockProfile]);
  });

  it('should return a profile by id', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockProfile),
    } as any);
    const profile = await service.findOne('1');
    expect(profile).toEqual(mockProfile);
  });

  it('should update a profile', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockProfile),
    } as any);
    const updatedProfile = await service.update('1', mockProfile as any);
    expect(updatedProfile).toEqual(mockProfile);
  });

  it('should delete a profile', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockProfile),
    } as any);
    const deletedProfile = await service.delete('1');
    expect(deletedProfile).toEqual(mockProfile);
  });
});
