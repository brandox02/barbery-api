import { Injectable } from '@nestjs/common';
import { CreateGeneralParameterInput } from './dto/create-general-parameter.input';
import { UpdateGeneralParameterInput } from './dto/update-general-parameter.input';

@Injectable()
export class GeneralParameterService {
  create(createGeneralParameterInput: CreateGeneralParameterInput) {
    return 'This action adds a new generalParameter';
  }

  findAll() {
    return `This action returns all generalParameter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generalParameter`;
  }

  update(id: number, updateGeneralParameterInput: UpdateGeneralParameterInput) {
    return `This action updates a #${id} generalParameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} generalParameter`;
  }
}
