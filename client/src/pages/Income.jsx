import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from '@mui/material';
import { ADD_INCOME_SOURCE } from '../utils/mutations';
import { GET_USER } from '../utils/queries';

export default function Income() {
  const [incomeData, setIncomeData] = useState({
    amount: '0.00',
    source: '',
    frequency: 'Monthly',
    checkNumber: '',
    note: '',
  });
  const [amountError, setAmountError] = useState(false);

  const userId = localStorage.getItem('user_id');

  const [addIncomeSource] = useMutation(ADD_INCOME_SOURCE, {
    onCompleted: (data) => {
      console.log('Mutation completed:', data);

      // Update the state with the new income
      setIncomes([...incomes, data.addIncomeSource]); // Assuming 'addIncomeSource' is the key in your response
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { loading, error, data: userData, refetch } = useQuery(GET_USER, {
    variables: { userId },
  });

  useEffect(() => {
    if (userData && userData.getUser && userData.getUser.profile) {
      setIncomes(userData.getUser.profile.incomes);
    }
  }, [userData]);

  const [incomes, setIncomes] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (loading === false) {
      setIsDataLoaded(true);
    }
  }, [loading]);

  const handleBlur = (event) => {
    if (!event.target.value.trim()) {
      setIncomeData({ ...incomeData, amount: '0.00' });
      setAmountError(true);
    } else {
      setAmountError(false);
    }
  };

  const handleAmountClick = (event) => {
    event.target.select();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIncomeData({ ...incomeData, [name]: value });

    // Reset amountError if a valid amount is entered
    if (name === 'amount' && value.trim() && parseFloat(value) !== 0) {
      setAmountError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addIncomeSource({
        variables: {
          source: incomeData.source,
          incomeAmount: parseFloat(incomeData.amount),
          frequency: incomeData.frequency,
        },
      });

      // Reset form data
      setIncomeData({ amount: '', source: '', frequency: 'Monthly', checkNumber: '', note: '' });

      // Refetch user data to get the updated incomes
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!isDataLoaded) return null;

  return (
    <div className="income-container p-4">
      <h1 className="text-2xl font-bold mb-4">Add Income</h1>
      <form onSubmit={handleSubmit} noValidate autoComplete="off" className="flex flex-col gap-4">
        <TextField
          className="w-1/2"
          label="Amount"
          name="amount"
          type="number"
          value={incomeData.amount}
          onChange={handleChange}
          onClick={handleAmountClick}
          onBlur={handleBlur}
          error={amountError}
          helperText={amountError ? 'Please enter an amount for this income' : ''}
          margin="dense"
        />
        <TextField
          className="w-1/2"
          label="Source"
          name="source"
          value={incomeData.source}
          onChange={handleChange}
          margin="dense"
        />
        {/* Dropdown for Frequency */}
        <Select
          className="w-1/2"
          label="Frequency"
          name="frequency"
          value={incomeData.frequency}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Frequency' }}
          margin="dense"
        >
          <MenuItem value="" disabled>
            Frequency
          </MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          {/* Add more frequency options as needed */}
        </Select>
        {/* ... other fields ... */}
        <Button type="submit" variant="contained" color="primary" className="w-1/2">
          Add Income
        </Button>
      </form>

      {/* Table to display incomes */}
      <TableContainer component={Paper} className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Frequency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomes.map((income) => (
              <TableRow key={income.source}>
                <TableCell>${income.incomeAmount}</TableCell>
                <TableCell>{income.source}</TableCell>
                <TableCell>{income.frequency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}