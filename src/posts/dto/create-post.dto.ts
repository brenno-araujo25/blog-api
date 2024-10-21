export class CreatePostDto {
    readonly title: string;
    readonly content: string;
    blogId: number;
    userId: number;
    //readonly tags: string[];
}
