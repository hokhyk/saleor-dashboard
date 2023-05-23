import { transactionEvent } from "@dashboard/orders/fixtures";
import Wrapper from "@test/wrapper";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router";

import { EventItem } from "./EventItem";

describe("EventItem", () => {
  it("displays correct event data", () => {
    const onHover = vi.fn();
    render(
      <MemoryRouter>
        <Wrapper>
          <EventItem
            event={transactionEvent}
            onHover={onHover}
            hoveredPspReference={null}
            hasCreatedBy={true}
          />
        </Wrapper>
      </MemoryRouter>,
    );
    const row = screen.getByRole("row");

    expect(row).toHaveTextContent("Success"); // Transaction event
    expect(row).toHaveTextContent("Capture");
    expect(row).toHaveTextContent(transactionEvent.amount.amount.toString());
    expect(row).toHaveTextContent(transactionEvent.amount.currency);
    expect(row).toHaveTextContent(transactionEvent.pspReference);
    expect(row).toHaveTextContent(
      "SuccessUSD58.98CaptureXCFDROVCDF232332DFGSAug 12, 2022, 04:40 PM GMT+2Checkout App",
    ); // date from transactionEvent
    expect(row).toHaveTextContent(transactionEvent.createdBy.name);
    expect(onHover).not.toHaveBeenCalled();
  });

  it("hides created by cell if prop is passed", () => {
    render(
      <Wrapper>
        <EventItem
          event={transactionEvent}
          onHover={() => undefined}
          hoveredPspReference={null}
          hasCreatedBy={false}
        />
      </Wrapper>,
    );

    const row = screen.getByRole("row");
    expect(row).not.toHaveTextContent(transactionEvent.createdBy.name);
  });

  it("calls onHover function when hovered", async () => {
    const onHover = vi.fn();
    render(
      <Wrapper>
        <EventItem
          event={transactionEvent}
          onHover={onHover}
          hoveredPspReference={null}
          hasCreatedBy={false}
        />
      </Wrapper>,
    );

    const row = screen.getByRole("row");
    await userEvent.hover(row);
    expect(onHover).toHaveBeenCalledWith(transactionEvent.pspReference);
  });

  it("applies hover styles if passed pspReference matches event's pspReference", () => {
    render(
      <Wrapper>
        <EventItem
          event={transactionEvent}
          onHover={() => undefined}
          hoveredPspReference={transactionEvent.pspReference}
          hasCreatedBy={false}
        />
      </Wrapper>,
    );

    const row = screen.getByRole("row");
    expect(row).toHaveAttribute("data-ishovered", "true");
  });
});
