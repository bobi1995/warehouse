"use client";

import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { getErrorMessage } from "@/db/error-messages";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const displayMessage = error.message.startsWith("MANUAL:")
    ? error.message.replace("MANUAL:", "")
    : getErrorMessage(error.message);
  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md p-6 bg-white rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-semibold">
            Възникна грешка
          </Dialog.Title>
          <Dialog.Description className="mt-2">
            Системно съобщение:
            <pre className="text-red-600">{displayMessage}</pre>
          </Dialog.Description>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={resetErrorBoundary}
            >
              Опитайте отново
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

type ErrorBoundaryWrapperProps = {
  children: ReactNode;
};

export function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}

export default ErrorBoundaryWrapper;
