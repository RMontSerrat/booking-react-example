import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';
import { useBooking } from './useBooking';

jest.mock('./useModal', () => ({
  useModal: () => ({
    openModal: jest.fn(),
  }),
}));

describe('useBooking', () => {
  test('should handle deleteBooking correctly', () => {
    const wrapper = ({ children }) => <RecoilRoot>{children}</RecoilRoot>;
    const { result } = renderHook(() => useBooking(), { wrapper });

    act(() => {
      result.current.deleteBooking({ id: '1', checkIn: '2022-01-01', checkOut: '2022-01-02' });
    });
  });

  test('should handle editBooking correctly', () => {
    const wrapper = ({ children }) => <RecoilRoot>{children}</RecoilRoot>;
    const { result } = renderHook(() => useBooking(), { wrapper });

    act(() => {
      result.current.editBooking({ id: '1', checkIn: '2022-01-01', checkOut: '2022-01-02' });
    });
  });
});
