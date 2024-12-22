import { IconButton, List, ListItem } from "@mui/material";
import { Expense } from "../shared/model/Expense";
import { Add } from "@mui/icons-material";

export default function Expenses() {
    const listOfExpenses: Expense[] = [{
        id: '123-12413124-2153',
        name: 'Food',
        currency: 'EUR'
    },
    {
        id: '123-12413124-21123',
        name: 'Sport',
        currency: 'EUR'
    }];
    return (
        <div>
            Expenses <IconButton color="info"><Add /></IconButton>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.black' }}
                aria-label="contacts"
            >
                {listOfExpenses &&
                    listOfExpenses.map((expense: Expense) => {
                        return <ListItem key={expense.id}>Icon {expense.name}</ListItem>;
                    })
                }
            </List>
        </div>
    );
}