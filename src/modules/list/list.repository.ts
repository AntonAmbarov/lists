import { ListModel, Prisma } from "@prisma/client";
import { IPrismaService } from "../database/prisma.service.interface";
import { IListRepository } from "./list.repository.interface";
import { CreateListInput } from "./list.schema";
import { title } from "process";

export class ListRepository implements IListRepository {
    private prisma: IPrismaService;

    constructor({prisma}: {prisma: IPrismaService}) {
        this.prisma = prisma;
    }

    async create(input: CreateListInput): Promise<ListModel> {
        const data: Prisma.ListModelCreateInput = {
            title: input.title,
            img: input.img,
            description: input.description,
            author: {connect: {id: input.authot}},
            category: {connect: {id: input.category}},
            status: input.status
        }

        return await this.prisma.client.listModel.create({data})
    }

    getOne(listId: number): Promise<Array<ListModel>> {
    }

    getMany(categoryId: number | null): Promise<Array<ListModel>> {
    }
    
}