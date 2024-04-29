// ** NestJS Import
import { ForbiddenException, Injectable } from '@nestjs/common';

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

  async getBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { userId, id: bookmarkId },
    });
    return bookmark;
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    // check if user owners the bookmark
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: dto,
    });
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });
    // check if user owners the bookmark
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return this.prisma.bookmark.delete({
      where: { id: bookmarkId },
    });
  }
}
