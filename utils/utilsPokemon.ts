import { Mfe } from "@/models/modalPokemon";

export class UtilitiesPokemon{

    public static GetMoveName(move:Mfe){
        return move.move.name;
    }
      
    public static GetMoveLv(move:Mfe){
        return move.version_group_details[0].level_learned_at;
    }

    public static sortMoves(moves:Mfe[]){
        return moves.sort((a,b) => this.GetMoveLv(a) - this.GetMoveLv(b))
    }
}