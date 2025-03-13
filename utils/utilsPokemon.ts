import { EffectEntry } from "@/models/modelAbility";
import { Mfe, Stat } from "@/models/modelPokemon";

export class UtilitiesPokemon {
    public static GetMoveName(move: Mfe) {
        return move.move.name;
    }

    public static GetAllMovesName(moves: Mfe[]) {
        const arr = [];
        moves.map((move) => {
            arr.push(move.move.name);
        });
    }

    public static GetMoveLv(move: Mfe) {
        return move.version_group_details[0].level_learned_at;
    }

    public static SortMovesDesc(moves: Mfe[]) {
        return moves.sort((a, b) => this.GetMoveLv(b) - this.GetMoveLv(a));
    }
    public static GetTotalPower(stats: Stat[]) {
        return stats.reduce((acc, num) => acc + num.base_stat, 0);
    }
    public static getAbilityDescription(effectEntries: EffectEntry[]) {
        const entry = effectEntries.find((effect) => effect.language.name === "en");
        return entry ? entry.short_effect : ""; // Return found description or empty string
    }
}
