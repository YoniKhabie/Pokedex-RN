import { Mfe, Stat } from "@/models/modalPokemon";

export class UtilitiesPokemon {
    public static GetMoveName(move: Mfe) {
        return move.move.name;
    }

    public static GetMoveLv(move: Mfe) {
        return move.version_group_details[0].level_learned_at;
    }

    public static SortMoves(moves: Mfe[]) {
        return moves.sort((a, b) => this.GetMoveLv(a) - this.GetMoveLv(b));
    }
    public static GetTotalPower(stats: Stat[]) {
        return stats.reduce((acc, num) => acc + num.base_stat, 0);
    }
}
