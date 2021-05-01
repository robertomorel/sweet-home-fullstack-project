import { Injectable } from '@nestjs/common';
import RepoService from './repositories/repo.service';

@Injectable()
export class AppService {

  constructor(private readonly repoService: RepoService) {}

  async getHello(): Promise<string> {
    return `Hello GraphQL!`;
  }
}
