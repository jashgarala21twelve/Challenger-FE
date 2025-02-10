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
import DynamicDataTable from '@/components/datatable/datatable';
import Loader from '@/components/loader/loader';

const Customers = () => {
  const { mutate, data, isPending, isError } = useSyncDB();

  useEffect(() => {
    const formData = convertToFormData({ model: Model.Customer });
    mutate(formData); // Execute the mutation
  }, [mutate]); // Runs only on mount
  const columns: ColumnDef<Customer>[] = [
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
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'user_id',
      header: 'User ID',
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
    // {
    //   accessorKey: 'created_at',
    //   header: 'Created At',
    //   cell: ({ row }) => (
    //     <div>{new Date(row.getValue('created_at')).toLocaleString()}</div>
    //   ),
    // },
    // {
    //   accessorKey: 'updated_at',
    //   header: 'Updated At',
    //   cell: ({ row }) => (
    //     <div>{new Date(row.getValue('updated_at')).toLocaleString()}</div>
    //   ),
    // },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(customer)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(customer.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const handleEdit = (customer: Customer) => {
    console.log('Edit customer:', customer);
    // Open edit modal or navigate to edit page
  };

  const handleDelete = (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      console.log('Delete customer with ID:', customerId);
      // Call delete API or update state
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <h1 className="p-4 text-xl font-semibold">Dashboard</h1>

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
            <DynamicDataTable columns={columns} data={data?.data} />
          </pre>
        </div>
      )}
    </div>
  );
};

export default Customers;
