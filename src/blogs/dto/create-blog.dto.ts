export class CreateBlogDto {
    userId: number;
    readonly title: string;
    readonly description: string;
    //readonly tags: string[];
}