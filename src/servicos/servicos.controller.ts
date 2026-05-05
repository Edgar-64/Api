import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { servicosService } from './servicos.service';

@Controller('servicos')
export class servicosController {
  constructor(private servicosService: servicosService) {}
}
