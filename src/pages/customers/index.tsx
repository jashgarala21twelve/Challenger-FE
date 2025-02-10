import DynamicDataTable, { DataTable } from '@/components/datatable/datatable';
import { Button } from '@/components/ui/button';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Delete,
  Edit,
  Edit2,
  Edit2Icon,
  MoreHorizontal,
} from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { convertToFormData, generateFakePayments } from '@/utils/helper';
import { useSyncDB } from '@/hooks/api/useSyncDB';
import { Model } from '@/utils/constants';
import { useEffect } from 'react';
import Loader from '@/components/loader/loader';

const Customers = () => {
  const { mutate, data, isPending, isError } = useSyncDB();

  useEffect(() => {
    const formData = convertToFormData({ model: Model.Customer });
    mutate(formData); // Execute the mutation
  }, [mutate]); // Runs only on mount

  const columns: ColumnDef[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // {
    //   accessorKey: 'status',
    //   header: 'Status',
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue('status')}</div>
    //   ),
    // },
    // {
    //   accessorKey: 'email',
    //   header: ({ column }) => (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //     >
    //       Email
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   ),
    //   cell: ({ row }) => (
    //     <div className="lowercase">{row.getValue('email')}</div>
    //   ),
    // },
    // {
    //   accessorKey: 'amount',
    //   header: () => <div className="text-right">Amount</div>,
    //   cell: ({ row }) => {
    //     const amount = parseFloat(row.getValue('amount'));
    //     const formatted = new Intl.NumberFormat('en-US', {
    //       style: 'currency',
    //       currency: 'USD',
    //     }).format(amount);

    //     return <div className="text-right font-medium">{formatted}</div>;
    //   },
    // },
    {
      accessorKey: 'id',
      // header: 'ID',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'user_id',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          User Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue('user_id')}</div>,
    },
    {
      accessorKey: 'cust_name',
      header: 'Customer Name',
      cell: ({ row }) => <div>{row.getValue('cust_name')}</div>,
    },
    {
      accessorKey: 'civil_id',
      header: 'Civil ID',
      cell: ({ row }) => <div>{row.getValue('civil_id')}</div>,
    },
    {
      accessorKey: 'is_company',
      header: 'Is Company',
      cell: ({ row }) => (
        <div>{row.getValue('is_company') === '1' ? 'Yes' : 'No'}</div>
      ),
    },
    {
      accessorKey: 'nationality',
      header: 'Nationality',
      cell: ({ row }) => <div>{row.getValue('nationality')}</div>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => <div>{row.getValue('phone')}</div>,
    },
    {
      accessorKey: 'mobile',
      header: 'Mobile',
      cell: ({ row }) => <div>{row.getValue('mobile') || 'N/A'}</div>,
    },
    {
      accessorKey: 'fax',
      header: 'Fax',
      cell: ({ row }) => <div>{row.getValue('fax') || 'N/A'}</div>,
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ row }) => <div>{row.getValue('notes') || 'N/A'}</div>,
    },
    {
      accessorKey: 'is_delete',
      header: 'Deleted',
      cell: ({ row }) => (
        <div>{row.getValue('is_delete') === 1 ? 'Yes' : 'No'}</div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => <div>{row.getValue('created_at')}</div>,
    },
    // {
    //   id: 'actions',
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original;

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Copy payment ID
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>View customer</DropdownMenuItem>
    //           <DropdownMenuItem>View payment details</DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem onClick={() => handleEdit(payment)}>
    //             Edit
    //           </DropdownMenuItem>
    //           <DropdownMenuItem onClick={() => handleDelete(payment.id)} className="text-red-600">
    //             Delete
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
    {
      id: 'edit_delete',

      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <div className="flex w-full   items-center  justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(payment)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(payment.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const filters = [
    {
      col_key: 'cust_name',
      filedType: 'input',
      placeHolder: 'Customer Name',
    },
    {
      col_key: 'phone',
      filedType: 'input',
      placeHolder: 'searchPhone',
    },

    {
      col_key: 'is_company',
      filedType: 'select',
      placeHolder: 'Is Company',
      options: [
        { label: 'Yes', value: '1' },
        { label: 'No', value: '0' },
      ],
    },
  ];

  const handleEdit = (payment: Payment) => {
    console.log('Edit payment:', payment);
    // Open edit modal or navigate to edit page
  };

  const handleDelete = (paymentId: string) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      console.log('Delete payment with ID:', paymentId);
      // Call delete API or update state
    }
  };

  return (
    // <div>
    //   Customers
    //   <DynamicDataTable data={payments} columns={columns} />
    // </div>
    <div className="flex flex-col flex-1 h-full">
      <h1 className="p-4 text-xl font-semibold">Customers</h1>

      {/* ✅ Loader now fills the entire dashboard area */}
      {isPending && <Loader />}

      {/* ✅ Error Message */}
      {isError && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">Error fetching data</p>
        </div>
      )}

      {/* ✅ Data Display */}
      {data && (
        <div className="p-4">
          <pre className="">
            {/* {JSON.stringify(data, null, 2)} */}
            <DynamicDataTable
              columns={columns}
              data={data?.data}
              filters={filters}
            />
          </pre>
        </div>
      )}
    </div>
  );
};

export default Customers;
