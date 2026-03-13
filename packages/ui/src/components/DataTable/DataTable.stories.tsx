import { type Meta } from "@storybook/react"
import { DataTable, type DataTableProps, DataTableColumnHeader, type ColumnDef } from "./"

const meta = {
  title: "Components/DataTable",
  component: DataTable,
} satisfies Meta<typeof DataTable>

export default meta

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const payments: Payment[] = [
  { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@yahoo.com" },
  { id: "3u1reuv4", amount: 242, status: "success", email: "abe45@gmail.com" },
  { id: "derv1ws0", amount: 837, status: "processing", email: "monserrat44@gmail.com" },
  { id: "5kma53ae", amount: 874, status: "success", email: "silas22@gmail.com" },
  { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@hotmail.com" },
  { id: "p0l9qk2x", amount: 129, status: "pending", email: "drew17@outlook.com" },
  { id: "rt6v2nw8", amount: 453, status: "success", email: "rachel@gmail.com" },
  { id: "xj3d8m1z", amount: 562, status: "processing", email: "mark.t@yahoo.com" },
  { id: "qw9e4r7y", amount: 198, status: "pending", email: "sarah.j@gmail.com" },
  { id: "zk5h6n3b", amount: 645, status: "success", email: "james.w@outlook.com" },
  { id: "uy2c7g0f", amount: 388, status: "failed", email: "lisa.m@hotmail.com" },
  { id: "wa1x8p4v", amount: 915, status: "success", email: "tom.b@gmail.com" },
]

const columns: ColumnDef<Payment, unknown>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <span className="capitalize">{row.getValue("status")}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" className="justify-end" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

export const Base = () => <DataTable columns={columns} data={payments} pageSize={5} />

export const NoPagination = () => <DataTable columns={columns} data={payments} pageSize={Infinity} />

export const Empty = () => <DataTable columns={columns} data={[]} emptyMessage="No payments found." />

export const CustomPageSize = () => <DataTable columns={columns} data={payments} pageSize={10} />
