import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrcService } from './orc.service';

@Controller('Orc')
export class OrcController {
  constructor(private OrcService: OrcService) {}
}
