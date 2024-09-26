import { IsEmail, IsInt, IsISO8601, IsNotEmpty, IsObject, IsOptional, IsString, Min } from "class-validator";
import { Prop } from "@nestjs/mongoose";

export class ProfileDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  mobile: string;

  @IsOptional()
  @IsString()
  gender: 'male' | 'female';

  @IsOptional()
  @IsISO8601()
  dob: string;

  @IsOptional()
  @IsObject()
  metadata: Map<string, any>;

  @IsOptional()
  @IsObject()
  additionalFields: { [key: string]: any };


}
