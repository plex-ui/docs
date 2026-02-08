'use client';

import { DateTime } from 'luxon';
import { useState } from 'react';
import { DatePicker } from '@plexui/ui/components/DatePicker';

export function DatePickerBaseDemo() {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  return (
    <DatePicker
      id="date-picker-base"
      triggerDateFormat="MM/dd/yy"
      size="lg"
      pill
      clearable
      value={selectedDate}
      onChange={(next) => setSelectedDate(next as DateTime | null)}
    />
  );
}

export function DatePickerLimitsDemo() {
  const today = DateTime.local();
  const minDate = today.minus({ days: 30 }).startOf('day');
  const maxDate = today.plus({ days: 30 }).endOf('day');
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(today);
  return (
    <DatePicker
      id="date-picker-limits"
      triggerDateFormat="MM/dd/yy"
      size="lg"
      pill
      triggerShowIcon
      value={selectedDate}
      onChange={(next) => setSelectedDate(next as DateTime | null)}
      min={minDate}
      max={maxDate}
    />
  );
}

export function DatePickerWithoutIconDemo() {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  return (
    <DatePicker
      id="date-picker-no-icon"
      triggerDateFormat="MM/dd/yy"
      size="md"
      triggerShowIcon={false}
      placeholder="Choose a date"
      value={selectedDate}
      onChange={(next) => setSelectedDate(next as DateTime | null)}
    />
  );
}

export function DatePickerDisabledDemo() {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(DateTime.local());
  return (
    <DatePicker
      id="date-picker-disabled"
      triggerDateFormat="MM/dd/yy"
      size="md"
      disabled
      value={selectedDate}
      onChange={(next) => setSelectedDate(next as DateTime | null)}
    />
  );
}
