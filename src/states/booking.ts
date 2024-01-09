// state.ts
import { atom } from 'recoil';
import { IBooking } from '@/interfaces/booking';

export const bookingsState = atom<IBooking[]>({
    key: 'bookingsState',
    default: [],
});
