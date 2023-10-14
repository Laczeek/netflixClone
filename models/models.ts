import { Genre, Production } from "@prisma/client";

export type GenresWithProductions = (Genre & {productions: Production[]})[]