export interface Recipe {
    id?: number;
    difficulty: number;
    name: string;
    description:string;
    time_min:number;
    time_max:number;
    number_people:number;
    type_recipe:string;
    estimated_price:number;
    total_calories:number;
}

