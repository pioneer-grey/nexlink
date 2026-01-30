export type SiteSnapshot={
    description: string,
    colors: string[],
    fontFamily: string[],
    imgUrl: string,
    name: string,
    url: string,
}

export type Brand={
    id:string,
} & Pick<SiteSnapshot,"name"|"url"|"imgUrl">