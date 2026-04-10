export interface Wand {
  wood: string;
  core: string;
  length: number | null;
}

export interface Character {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number | null;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string;
}

const BASE_URL = 'https://hp-api.onrender.com/api';

export const characterService = {
  async getAll(): Promise<Character[]> {
    const res = await fetch(`${BASE_URL}/characters`);
    if (!res.ok) throw new Error('Falha ao carregar personagens');
    return res.json();
  },
};
