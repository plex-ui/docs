'use client';

import React, { useState } from 'react';
import { FileUpload } from '@plexui/ui/components/FileUpload';
import { Button } from '@plexui/ui/components/Button';

function createMockFile(name: string, sizeKB: number, type: string): File {
  const bytes = new Uint8Array(sizeKB * 1024);
  return new File([bytes], name, { type });
}

const MOCK_FILES = [
  createMockFile('government-id-scan.pdf', 2100, 'application/pdf'),
  createMockFile('passport-photo.png', 340, 'image/png'),
  createMockFile('non-citizen-travel-2026-approved-document.pdf', 1500, 'application/pdf'),
];

export function FileUploadFormDemo() {
  const [files, setFiles] = useState<File[]>(MOCK_FILES);

  return (
    <div data-demo-stage className="py-10">
      <div className="w-[360px]">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-semibold tracking-tight">Upload documents</h3>
          <p className="text-secondary text-sm mt-1">Please provide the required files to continue.</p>
        </div>
        <div className="flex flex-col gap-3">
          <FileUpload
            accept=".pdf,.png"
            multiple
            maxFiles={5}
            value={files}
            onValueChange={setFiles}
          />
          <Button color="primary" size="3xl" pill block className="h-[3.25rem] mt-3">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
