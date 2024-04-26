// ** NestJS Import
import { Injectable } from '@nestjs/common';

// ** Dtos Import
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

// ** Prisma Import
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({ where: { userId } });
  }

  getBookmarkById(userId: number, bookmarkId: number) {}

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
    return bookmark;
  }

  editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {}

  deleteBookmarkById(userId: number, bookmarkId: number) {}
}
