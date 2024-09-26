import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export interface ILog
  { date: Date, message: string; data?:any, by: string }


@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  mobile: string;

  @Prop()
  gender: 'male' | 'female';

  @Prop()
  dob: string;

  @Prop({ type: Map })
  metadata: Map<string, any>;

  @Prop({ type: 'object' })
  additionalFields: { [key: string]: any };

  @Prop({ type: [{ date: Date, message: String, by: String }] })
  log: ILog[];

  @Prop({ type: 'date', default: null })
  isDeleted: string;
}

export type ProfileDocument = HydratedDocument<Profile>;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
