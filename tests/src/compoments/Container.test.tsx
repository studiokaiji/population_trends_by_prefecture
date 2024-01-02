import { Container } from "@/components/Container";
import { render, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

const InsideComponent = (props: { isDisplaySuspenseFallback: boolean }) => {
  if (props.isDisplaySuspenseFallback) {
    throw new Promise(() => null);
  }
  return <div data-testid="testId" />;
};

describe("Container", () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });

  it("First view", () => {
    const { getByRole, queryByTestId } = render(
      <Container>
        <InsideComponent isDisplaySuspenseFallback />
      </Container>,
    );

    waitFor(() => {
      expect(getByRole("navigation")).toBeInTheDocument();
      expect(queryByTestId("testId")).not.toBeInTheDocument();
    });
  });

  it("Data loaded", () => {
    const { getByRole, getByTestId } = render(
      <Container>
        <InsideComponent isDisplaySuspenseFallback={false} />
      </Container>,
    );

    expect(getByRole("navigation")).toBeInTheDocument();
    expect(getByTestId("testId")).toBeInTheDocument();
  });
});
