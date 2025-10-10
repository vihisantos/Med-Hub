import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export class SignupMedicoDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  crm!: string;

  @IsNotEmpty()
  @IsString()
  specialty!: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  phone?: string;

  @IsNotEmpty()
  @Length(8, 64)
  password!: string;

  consentEssential!: boolean;
  consentMarketing?: boolean;
  consentHealthData?: boolean;
}

export class SignupHospitalDto {
  @IsNotEmpty()
  @IsString()
  hospitalName!: string;

  @IsNotEmpty()
  @IsString()
  cnpj!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @Length(8, 64)
  password!: string;

  consentEssential!: boolean;
  consentMarketing?: boolean;
  consentHealthData?: boolean;
}