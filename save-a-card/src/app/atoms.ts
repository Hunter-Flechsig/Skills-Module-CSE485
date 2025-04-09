import { CardModel } from '@/models/card';
import { atom } from 'jotai';

export const myAtom = atom<CardModel[]>([]);