import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class Profile extends Document {
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
}

export type ProfileDocument = HydratedDocument<Profile>;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
