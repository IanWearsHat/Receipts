import { Button, TableCell, TableRow } from "@mui/material";
import { PriceInput } from "../lib/PriceInput";
import { ItemsMap } from "../ReceiptEditor/ItemsMap";


interface TableRowsProps {
  selectedName: string;
  items: ItemsMap;
  setItems: (updater: (draft: ItemsMap) => void) => void;
}

export default function TableRows({
  selectedName,
  items,
  setItems,
}: TableRowsProps) {
  return (
    <>
      {Object.entries(items).map(([receiptItemName, value]) => (
        <TableRow
          key={receiptItemName}
          // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {receiptItemName}
          </TableCell>

          <TableCell align="right">
            <PriceInput
              inputValue={
                value.buyers[selectedName] ? value.buyers[selectedName] : 0
              }
              updateReceiptPrice={(newPrice: number) => {
                setItems((draft: ItemsMap) => {
                  draft[receiptItemName]["buyers"][selectedName] = newPrice;
                });
              }}
              disabled={selectedName === ""}
              placeholder={
                selectedName === "" ? "Select buyer first" : "Enter buyer total"
              }
            />
            {" / "}
            <PriceInput
              updateReceiptPrice={(newPrice: number) => {
                setItems((draft: ItemsMap) => {
                  draft[receiptItemName]["totalPrice"] = newPrice;
                });
              }}
              placeholder="Enter total"
            />
            <Button
              id={receiptItemName}
              variant="outlined"
              color="error"
              onClick={() => {
                setItems((draft) => {
                  const newItems = { ...draft };
                  delete newItems[receiptItemName];
                  return newItems;
                });
              }}
            >
              Delete Item
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
