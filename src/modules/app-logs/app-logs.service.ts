import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {AppLogs} from "./schema/app-log.schema";
import {Model} from "mongoose";
import {ICreateAppLog} from "./interfaces/create-app-log.interface";

@Injectable()
export class AppLogsService {
  constructor(
      @InjectModel(AppLogs.name) private appLogModel: Model<AppLogs>,
  ) {}

  async create(createAppLogDto: ICreateAppLog) {
    const log =  new this.appLogModel(createAppLogDto);
    if (!log) {
      throw new InternalServerErrorException('Error creating app log');
    }
    return await log.save();
  }

  async getSummary() {
    return this.appLogModel.aggregate([
      {
        $group: {
          _id: { url: '$url', path: '$path', method: '$method' },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.url',
          totalRequests: { $sum: '$count' },
          endpoints: {
            $push: {
              path: '$_id.path',
              method: '$_id.method',
              count: '$count',
            },
          },
        },
      },
      { $sort: { totalRequests: -1 } },
    ]);
  }

  async findByUrl(url: string) {
    const regex = this.parseUrl(url)
    return this.appLogModel.find({ url: { $regex: regex } }).exec();
  }

  async getStatsByUrl(url: string) {
    const regex = this.parseUrl(url)

    return this.appLogModel.aggregate([
      { $match: { url: { $regex: regex } } },
      {
        $group: {
          _id: { method: '$method', path: '$path' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
  }

  private parseUrl(url: string) {
    const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^(https?:\\/\\/)?(www\\.)?${escapedUrl}`, 'i');
  }

}
