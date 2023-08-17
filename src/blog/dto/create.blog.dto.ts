import { ArrayMinSize, ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsString } from "class-validator"


export class CreateBlogDTO {
    
    @IsNotEmpty()
    @IsString()
    slug: string

    @IsNotEmpty()
    @IsString()
    title: string
    
    @IsString()
    @IsNotEmpty()
    thumbnail: string
    
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    content: string

    // @IsArray()
    // @ArrayNotEmpty()
    // @ArrayMinSize(1)
    // blogHashtags: string[]

}