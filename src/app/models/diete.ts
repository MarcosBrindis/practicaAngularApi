export interface Diete {
    diete_id?: number;  
             
    foods: string;                
    calorias?: number;   
    food_type: string;             // Nuevo atributo para el tipo de comida (vegetarian, etc.)
    meal_time: string;             // Nuevo atributo para el tiempo de comida (breakfast, lunch, etc.)
    portion_size: number;          // Tamaño de la porción (en gramos)
    diet_rating: number;
  
    created_at: string;           
    created_by: number;          
    updated_at: string;          
    updated_by?: number;         
    deleted?: boolean;     
}
