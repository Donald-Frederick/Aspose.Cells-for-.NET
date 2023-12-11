import { render, fireEvent, screen } from "@testing-library/react";
import { withi4n, waitFor } from "@testing-library/dom";
import XlFileViewer from "./XlFileViewer";
import "../test/setup-server"

describe("loads the xls", () => {
  render(<XlFileViewer />);
  let container;
  test("loads items eventually", async () => {
    container = await screen.getByTestId("gridjs-demo");
    expect(container).toBeInTheDocument();
  });

  describe("the canvas images of the excel match the snapshots", () => {
    test("the canvas table image of the excel matches the snapshot", async () => {
      //const container = await screen.getByTestId('gridjs-demo');
      const canvas = await waitFor(() => {
        const canvas = container.querySelector("canvas.x-spreadsheet-table");
        if (!canvas) {
          throw new Error("not found");
        }
      });
      //const canvas = container.querySelector('canvas.x-spreadsheet-table');
      const img = canvas.toDataURL();
      const data = img.replace(/^data:image\/\w+;base64,/, "");
      const buf = Buffer.from(data, "base64");
      // may need to do fuzzy image comparison because, at least for me, on
      // travis-ci it was sometimes 2 pixel diff or more for font related stuff
      expect(buf).toMatchImageSnapshot({
        failureThreshold: 0.5,
        failureThresholdType: "percent",
      });
      //x - spreadsheet - table;
      //lower - canvas;
      //upper - canvas;
    });
  });
});
