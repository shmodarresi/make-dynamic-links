import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

const mockSetState = jest.fn();

describe("Snapshot testing Pagination Component", () => {
  it("renders correctly", () => {
    const Component = renderer
      .create(
        <Pagination
          noPages={10}
          currentPage={5}
          setCurrentPage={mockSetState}
        />
      )
      .toJSON();
    expect(Component).toMatchSnapshot();
  });
});

describe("Element testing Pagination Component", () => {
  const currentPage = 5;
  it("render correctly elements", async () => {
    render(
      <Pagination
        noPages={10}
        currentPage={currentPage}
        setCurrentPage={mockSetState}
      />
    );
    const nodeElement = screen.getByText(/Prev/i);
    const nodeElements = screen.getAllByRole("button");

    expect(nodeElement).toBeInTheDocument();
    expect(nodeElements.length).toEqual(12);
    userEvent.click(screen.getByText("2"));
    expect(mockSetState).toHaveBeenCalledTimes(1);
  });
});
