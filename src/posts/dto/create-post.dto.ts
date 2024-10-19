export class CreatePostDto {
    readonly title: string;
    readonly content: string;
    readonly blogId: number;
    readonly userId: number;
    //readonly tags: string[];
}