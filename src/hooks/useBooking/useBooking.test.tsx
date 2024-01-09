import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';
import { useBooking } from './useBooking';
import { bookingsState } from '@/states/booking';

import dayjs from 'dayjs';

jest.mock('@/hooks/useModal', () => ({
  useModal: () => ({
    openModal: jest.fn(),
  }),
}));

const mockInitialState = [
  { id: '1', checkIn: dayjs('2022-01-01'), checkOut: dayjs('2022-01-02') },
  { id: '2', checkIn: dayjs('2022-01-03'), checkOut: dayjs('2022-01-04') }
];

const wrapper = ({ children }) => <RecoilRoot initializeState={({set}) => {
  set(bookingsState, mockInitialState);
}}>{children}</RecoilRoot>;

describe('useBooking', () => {
  test('should handle addBooking correctly', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    act(() => {
      result.current.addBooking({ checkIn: dayjs('2022-01-01'), checkOut: dayjs('2022-01-02') });
    });
    expect(result.current.bookings.length).toEqual(3);
  });
  
  test('should handle deleteBooking correctly', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    act(() => {
      result.current.deleteBooking({ id: '1', checkIn: dayjs('2022-01-01'), checkOut: dayjs('2022-01-02') });
    });
    expect(result.current.bookings.length).toEqual(1);
  });

  test('should handle editBooking correctly', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    act(() => {
      result.current.editBooking({ id: '1', checkIn: dayjs('2022-01-02'), checkOut: dayjs('2022-01-03') });
    });
  });
});
