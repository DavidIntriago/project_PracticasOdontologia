import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  correo: string;

  @IsString()
  clave: string;
}
