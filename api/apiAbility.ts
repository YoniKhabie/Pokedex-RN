import { AbilityConfig } from "@/models/modalAbility";
import { AbilityInfo } from "@/models/modalPokemon";
import { UtilitiesPokemon } from "@/utils/utilsPokemon";

export const getAbilityInfo = async (abilitiesArr: string[]) => {
    const responseArr: any[] = [];
    const abilitiesMap: Map<string, AbilityInfo> = new Map();

    try {
        abilitiesArr.map((ability) => {
            const url = `https://pokeapi.co/api/v2/ability/${ability}`;
            responseArr.push(fetch(url).then((res) => res.json()));
        });
        const jsonArr = await Promise.all(responseArr);
        jsonArr.forEach((json, i) => {
            const abilityConfig: AbilityConfig = {
                effect_entries: json.effect_entries,
                id: json.id,
                pokemon: json.pokemon,
            };
            const abilityInfo: AbilityInfo = {
                id: abilityConfig.id,
                description: UtilitiesPokemon.getAbilityDescription(abilityConfig.effect_entries),
                pokemons: abilityConfig.pokemon,
                ability_name: abilitiesArr[i],
            };
            const name = abilitiesArr[i];
            abilitiesMap.set(name, abilityInfo);
        });

        return abilitiesMap;
    } catch (error) {
        return [];
    }
};
