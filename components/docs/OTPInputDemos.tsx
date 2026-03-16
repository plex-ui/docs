'use client';

import React, { useState } from 'react';
import { OTPInput } from '@plexui/ui/components/OTPInput';
import { FloatingLabelInput } from '@plexui/ui/components/FloatingLabelInput';
import { Button } from '@plexui/ui/components/Button';

export function OTPInputOverviewDemo() {
  const [value, setValue] = useState('');

  return (
    <div data-demo-stage className="py-10 flex justify-center">
      <OTPInput value={value} onChange={setValue} autoFocus />
    </div>
  );
}

export function OTPInputFilledDemo() {
  const [value, setValue] = useState('488030');

  return (
    <div data-demo-stage className="py-10 flex justify-center">
      <OTPInput value={value} onChange={setValue} />
    </div>
  );
}

export function OTPInputGroupedDemo() {
  const [value, setValue] = useState('');

  return (
    <div data-demo-stage className="py-10 flex justify-center">
      <OTPInput value={value} onChange={setValue} grouping={[3, 3]} />
    </div>
  );
}

export function OTPInputErrorDemo() {
  const [value, setValue] = useState('48803');

  return (
    <div data-demo-stage className="py-10 flex justify-center">
      <OTPInput
        value={value}
        onChange={setValue}
        invalid
        errorMessage="Invalid verification code."
      />
    </div>
  );
}

export function OTPInputDisabledDemo() {
  return (
    <div data-demo-stage className="py-10 flex justify-center">
      <OTPInput value="488030" disabled />
    </div>
  );
}

export function OTPInputCheckInboxFormDemo() {
  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const showError = submitted && !code;

  return (
    <div data-demo-stage className="py-10">
      <div className="w-[360px]">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold tracking-tight">Check your inbox</h3>
          <p className="text-secondary text-sm mt-1">
            Enter the verification code we just sent to sergey.tomashevsky@gmail.com
          </p>
        </div>
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          noValidate
        >
          <FloatingLabelInput
            label="Code"
            value={code}
            onChange={(evt) => { setCode(evt.target.value); setSubmitted(false); }}
            inputMode="numeric"
            autoFocus
            invalid={showError}
            errorMessage={showError ? 'Please enter the verification code.' : undefined}
          />
          <Button color="primary" type="submit" className="w-full h-[3.25rem] mt-3">Continue</Button>
          <p className="text-base text-center mt-4">
            <a className="hover:underline cursor-pointer">Resend email</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export function OTPInputVerifyEmailFormDemo() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const showError = submitted && value.length < 6;

  return (
    <div data-demo-stage className="py-10">
      <div className="w-[360px]">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold tracking-tight">Verify your email address</h3>
          <p className="text-secondary text-sm mt-1">Enter the code sent to sergey.tomashevsky@gmail.com</p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          noValidate
        >
          <OTPInput
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
              setSubmitted(false);
            }}
            invalid={showError}
            errorMessage={showError ? 'Please enter the full code.' : undefined}
            autoFocus
          />
          <Button color="primary" type="submit" className="w-full h-[3.25rem] mt-3">Continue</Button>
          <p className="text-base text-center mt-4">
            <a className="hover:underline cursor-pointer">Resend email</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export function OTPInputConfirmPhoneFormDemo() {
  const [value, setValue] = useState('');

  return (
    <div data-demo-stage className="py-10">
      <div className="w-[360px]">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold tracking-tight">Confirm phone</h3>
          <p className="text-secondary text-sm mt-1">Enter the code sent to +34 625 95 80 50</p>
        </div>
        <div className="flex flex-col gap-3">
          <OTPInput value={value} onChange={setValue} autoFocus />
          <p className="text-base text-center mt-4">
            <a className="hover:underline cursor-pointer">Resend code</a>
          </p>
        </div>
      </div>
    </div>
  );
}
