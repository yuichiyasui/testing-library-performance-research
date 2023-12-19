import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { Providers } from "@/app/providers";

export const renderWithProviders = (ui: React.ReactElement) => {
  const user = userEvent.setup();

  return {
    user,
    ...render(<Providers>{ui}</Providers>),
  };
};
