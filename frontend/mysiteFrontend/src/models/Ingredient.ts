import { Tag } from "./Tag";
import { Allergen } from "./Allergen";

export interface Ingredient {
    id?: number;
    name: string;
    price:string;
    calories:number;
    tags:Tag [];
    allergens: Allergen[]
}
