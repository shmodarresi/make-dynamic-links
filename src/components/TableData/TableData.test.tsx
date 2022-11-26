import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { TableData } from "./TableData";
import data from '../../data.json';

const Info = jest.fn();

describe("Snapshot testing Table Component", () => {
  it("renders correctly", () => {
    const Component = renderer
      .create(
        <TableData Info={Info} data={data} indexOfFirstData={0} />
      )
      .toJSON();
    expect(Component).toMatchSnapshot();
  });
});

describe("Element testing Table Component", () => {
  it("render correctly elements", async () => {
    render(
        <TableData Info={Info} data={data} indexOfFirstData={0} />
    );
    const InfoElement = screen.getByText(/Info/i);
    const SelectedItemsTitleElement = screen.getByText(/Selected Items:/i);
    const SelectedItemsElement = screen.getByText(/No Item is Selected/i);
    const CheckboxElements = screen.getAllByRole("checkbox");
    
    expect(SelectedItemsElement).toBeInTheDocument();
    expect(SelectedItemsTitleElement).toBeInTheDocument();
    expect(InfoElement).toBeInTheDocument();
    expect(CheckboxElements.length).toEqual(111);
    expect(Info).toHaveBeenCalledTimes(111);

  });

  it("render correctly selectef elements", async () => {
    render(
        <TableData Info={Info} data={data} indexOfFirstData={0} />
    );
    
    const CheckboxElement = screen.getAllByRole("checkbox")[0];
    userEvent.click(CheckboxElement);
    const SelectedCheckboxElements = screen.getAllByRole("checkbox", { checked: true });
    const NoItemsElement = screen.queryByText(/No Item is Selected/i);
    expect(SelectedCheckboxElements.length).toEqual(1);
    expect(NoItemsElement).not.toBeInTheDocument();
  });
});
